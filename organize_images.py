"""
Image organizer by visual content using Claude AI.
Scans a folder, identifies what's in each image, and proposes categories.
"""

import anthropic
import base64
import os
import shutil
from pathlib import Path
from collections import defaultdict

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"}

SUPPORTED_MEDIA_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
}


def find_images(folder: Path) -> list[Path]:
    images = []
    for ext in IMAGE_EXTENSIONS:
        images.extend(folder.glob(f"**/*{ext}"))
        images.extend(folder.glob(f"**/*{ext.upper()}"))
    return sorted(set(images))


def encode_image(path: Path) -> tuple[str, str]:
    ext = path.suffix.lower()
    media_type = SUPPORTED_MEDIA_TYPES.get(ext, "image/jpeg")
    with open(path, "rb") as f:
        data = base64.standard_b64encode(f.read()).decode("utf-8")
    return data, media_type


def classify_image(client: anthropic.Anthropic, image_path: Path) -> str:
    """Ask Claude what category this image belongs to."""
    try:
        data, media_type = encode_image(image_path)
    except Exception as e:
        print(f"  ⚠️  Could not read {image_path.name}: {e}")
        return "unreadable"

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=100,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": data,
                        },
                    },
                    {
                        "type": "text",
                        "text": (
                            "What is the main subject of this image? "
                            "Reply with a short category name in Hebrew (2-4 words max), "
                            "suitable as a folder name. "
                            "Examples: ארונות אמבטיה, מטבחים, ספות סלון, שולחנות אוכל, "
                            "מיטות וחדרי שינה, כסאות משרדיים, תאורה, שטיחים. "
                            "Reply ONLY with the category name, nothing else."
                        ),
                    },
                ],
            }
        ],
    )
    return response.content[0].text.strip()


def sanitize_folder_name(name: str) -> str:
    """Remove characters that are invalid in Windows folder names."""
    invalid = r'\/:*?"<>|'
    for ch in invalid:
        name = name.replace(ch, "")
    return name.strip() or "אחר"


def scan_and_categorize(folder: str) -> dict[str, list[Path]]:
    folder_path = Path(folder)
    if not folder_path.exists():
        print(f"❌ התיקייה לא נמצאה: {folder}")
        return {}

    images = find_images(folder_path)
    if not images:
        print("❌ לא נמצאו תמונות בתיקייה.")
        return {}

    print(f"\n🔍 נמצאו {len(images)} תמונות. מתחיל ניתוח...\n")

    client = anthropic.Anthropic()
    categories: dict[str, list[Path]] = defaultdict(list)

    for i, image_path in enumerate(images, 1):
        print(f"  [{i}/{len(images)}] מנתח: {image_path.name}...")
        category = classify_image(client, image_path)
        category = sanitize_folder_name(category)
        categories[category].append(image_path)
        print(f"         → {category}")

    return dict(categories)


def print_summary(categories: dict[str, list[Path]]) -> None:
    print("\n" + "=" * 50)
    print("📊 סיכום הקטגוריות המוצעות:")
    print("=" * 50)
    total = sum(len(v) for v in categories.values())
    for category, files in sorted(categories.items(), key=lambda x: -len(x[1])):
        print(f"\n📁 {category}  ({len(files)} תמונות)")
        for f in files:
            print(f"   - {f.name}")
    print(f"\nסה\"כ: {total} תמונות ב-{len(categories)} קטגוריות")


def move_files(categories: dict[str, list[Path]], destination: str) -> None:
    dest_root = Path(destination)
    dest_root.mkdir(parents=True, exist_ok=True)

    moved = 0
    for category, files in categories.items():
        category_folder = dest_root / category
        category_folder.mkdir(parents=True, exist_ok=True)
        for src in files:
            dst = category_folder / src.name
            # Avoid overwriting if file already exists
            if dst.exists():
                stem, suffix = src.stem, src.suffix
                dst = category_folder / f"{stem}_copy{suffix}"
            shutil.move(str(src), str(dst))
            moved += 1
            print(f"  ✅ {src.name}  →  {category}/")

    print(f"\n✔ הועברו {moved} קבצים.")


def main():
    print("🖼️  מארגן תמונות חכם באמצעות Claude AI")
    print("=" * 50)

    source_folder = input("\nאיפה התמונות? הכנס נתיב (לדוגמה: C:\\Users\\you\\Pictures): ").strip()
    if not source_folder:
        print("לא הוזן נתיב. יוצא.")
        return

    # Step 1: Scan only
    categories = scan_and_categorize(source_folder)
    if not categories:
        return

    print_summary(categories)

    # Step 2: Ask what to do
    print("\n" + "=" * 50)
    choice = input(
        "\nמה תרצה לעשות?\n"
        "  1 - להעביר את הקבצים לתיקיות (בתוך אותה תיקייה)\n"
        "  2 - להעביר את הקבצים לתיקיית יעד אחרת\n"
        "  3 - לצאת בלי לשנות כלום\n"
        "בחירה (1/2/3): "
    ).strip()

    if choice == "1":
        move_files(categories, source_folder)
    elif choice == "2":
        dest = input("הכנס נתיב לתיקיית יעד: ").strip()
        if dest:
            move_files(categories, dest)
        else:
            print("לא הוזן נתיב. יוצא.")
    else:
        print("יצאת בלי לשנות קבצים.")


if __name__ == "__main__":
    main()
