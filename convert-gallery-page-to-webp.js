const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const imagesFolder = path.join(__dirname, "public", "images", "faden");

function formatSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function convertGalleryImages() {
  try {
    const files = await fs.readdir(imagesFolder);

    const galleryImages = files
      .filter((file) => /^gallery-page-\d+\.png$/i.test(file))
      .sort((firstFile, secondFile) => {
        const firstNumber = Number(
          firstFile.match(/gallery-page-(\d+)/i)?.[1] || 0,
        );

        const secondNumber = Number(
          secondFile.match(/gallery-page-(\d+)/i)?.[1] || 0,
        );

        return firstNumber - secondNumber;
      });

    if (galleryImages.length === 0) {
      console.log("لم يتم العثور على صور gallery-page بصيغة PNG.");

      return;
    }

    console.log(`تم العثور على ${galleryImages.length} صورة.\n`);

    let totalOriginalSize = 0;
    let totalConvertedSize = 0;

    for (const fileName of galleryImages) {
      const inputPath = path.join(imagesFolder, fileName);

      const outputFileName = fileName.replace(/\.png$/i, ".webp");

      const outputPath = path.join(imagesFolder, outputFileName);

      const originalStats = await fs.stat(inputPath);

      await sharp(inputPath)
        .webp({
          quality: 92,
          alphaQuality: 100,
          effort: 6,
          smartSubsample: true,
        })
        .toFile(outputPath);

      const convertedStats = await fs.stat(outputPath);

      totalOriginalSize += originalStats.size;
      totalConvertedSize += convertedStats.size;

      const savingPercentage =
        ((originalStats.size - convertedStats.size) / originalStats.size) * 100;

      console.log(`✓ ${fileName} → ${outputFileName}`);

      console.log(
        `قبل: ${formatSize(originalStats.size)} | ` +
          `بعد: ${formatSize(convertedStats.size)} | ` +
          `التوفير: ${savingPercentage.toFixed(1)}%\n`,
      );
    }

    const totalSavingPercentage =
      ((totalOriginalSize - totalConvertedSize) / totalOriginalSize) * 100;

    console.log("--------------------------------");

    console.log(`الحجم الإجمالي قبل: ${formatSize(totalOriginalSize)}`);

    console.log(`الحجم الإجمالي بعد: ${formatSize(totalConvertedSize)}`);

    console.log(`إجمالي التوفير: ${totalSavingPercentage.toFixed(1)}%`);

    console.log("--------------------------------");
    console.log("تم تحويل جميع صور Gallery بنجاح.");
    console.log("صور PNG الأصلية لم يتم حذفها.");
  } catch (error) {
    console.error("حدث خطأ أثناء تحويل الصور:");
    console.error(error);
    process.exit(1);
  }
}

convertGalleryImages();
