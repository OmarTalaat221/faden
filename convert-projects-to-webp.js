const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const imagesFolder = path.join(__dirname, "public", "images", "faden");

const webpQuality = 90;
const deleteOriginalPngFiles = false;

function formatSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getImageOrder(fileName) {
  if (/^projects-banner\.png$/i.test(fileName)) {
    return 0;
  }

  const pageNumber = fileName.match(/^projects-page-(\d+)\.png$/i)?.[1];

  return Number(pageNumber || 999999);
}

async function convertProjectImages() {
  try {
    await fs.access(imagesFolder);

    const files = await fs.readdir(imagesFolder);

    const projectImages = files
      .filter((fileName) => {
        return (
          /^projects-banner\.png$/i.test(fileName) ||
          /^projects-page-\d+\.png$/i.test(fileName)
        );
      })
      .sort((firstFile, secondFile) => {
        return getImageOrder(firstFile) - getImageOrder(secondFile);
      });

    if (projectImages.length === 0) {
      console.log("لم يتم العثور على صور projects بصيغة PNG.");

      return;
    }

    console.log(`تم العثور على ${projectImages.length} صورة Projects.\n`);

    let convertedImagesCount = 0;
    let failedImagesCount = 0;
    let totalOriginalSize = 0;
    let totalConvertedSize = 0;

    for (const fileName of projectImages) {
      const inputPath = path.join(imagesFolder, fileName);

      const outputFileName = fileName.replace(/\.png$/i, ".webp");

      const outputPath = path.join(imagesFolder, outputFileName);

      try {
        const originalStats = await fs.stat(inputPath);

        const inputMetadata = await sharp(inputPath).metadata();

        await fs.rm(outputPath, {
          force: true,
        });

        const outputInfo = await sharp(inputPath)
          .webp({
            quality: webpQuality,
            alphaQuality: 100,
            effort: 6,
            smartSubsample: true,
            preset: "photo",
            exact: true,
          })
          .toFile(outputPath);

        if (
          outputInfo.width !== inputMetadata.width ||
          outputInfo.height !== inputMetadata.height
        ) {
          await fs.rm(outputPath, {
            force: true,
          });

          throw new Error(
            `تغيرت أبعاد الصورة من ${inputMetadata.width}x${inputMetadata.height} إلى ${outputInfo.width}x${outputInfo.height}`,
          );
        }

        const convertedStats = await fs.stat(outputPath);

        totalOriginalSize += originalStats.size;
        totalConvertedSize += convertedStats.size;
        convertedImagesCount += 1;

        const sizeDifference = originalStats.size - convertedStats.size;

        const savingPercentage = (sizeDifference / originalStats.size) * 100;

        console.log(`✓ ${fileName} → ${outputFileName}`);

        console.log(`الأبعاد: ${outputInfo.width} × ${outputInfo.height}`);

        console.log(
          `قبل: ${formatSize(originalStats.size)} | ` +
            `بعد: ${formatSize(convertedStats.size)} | ` +
            `${
              savingPercentage >= 0
                ? `التوفير: ${savingPercentage.toFixed(1)}%`
                : `زيادة الحجم: ${Math.abs(savingPercentage).toFixed(1)}%`
            }\n`,
        );

        if (deleteOriginalPngFiles) {
          await fs.unlink(inputPath);

          console.log(`تم حذف الصورة الأصلية: ${fileName}\n`);
        }
      } catch (imageError) {
        failedImagesCount += 1;

        console.error(`✗ فشل تحويل: ${fileName}`);
        console.error(`${imageError.message}\n`);
      }
    }

    console.log("--------------------------------");

    console.log(`تم التحويل بنجاح: ${convertedImagesCount}`);

    console.log(`عدد الصور التي فشلت: ${failedImagesCount}`);

    console.log(`الحجم الإجمالي قبل: ${formatSize(totalOriginalSize)}`);

    console.log(`الحجم الإجمالي بعد: ${formatSize(totalConvertedSize)}`);

    if (totalOriginalSize > 0) {
      const totalSavingPercentage =
        ((totalOriginalSize - totalConvertedSize) / totalOriginalSize) * 100;

      console.log(`إجمالي التوفير: ${totalSavingPercentage.toFixed(1)}%`);
    }

    console.log("--------------------------------");

    if (!deleteOriginalPngFiles) {
      console.log("تم الاحتفاظ بجميع صور PNG الأصلية.");
    }

    console.log("تم تحويل صور Projects إلى WebP بنجاح.");
  } catch (error) {
    console.error("حدث خطأ أثناء الوصول إلى مجلد الصور:");

    console.error(error.message);

    process.exitCode = 1;
  }
}

convertProjectImages();
