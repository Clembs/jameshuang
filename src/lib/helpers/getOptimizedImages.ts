import sharp from 'sharp';

export async function getOptimizedImages(imageBuffer: ArrayBuffer) {
	const { width, height } = (await sharp(imageBuffer).metadata()) as {
		width: number;
		height: number;
	};

	const highQuality = await sharp(imageBuffer)
		.resize({
			width: width > 1200 ? 1200 : width,
			height: Math.round((1200 / width) * height)
		})
		.webp({ quality: 80 })
		.toBuffer();

	const thumbnail = await sharp(imageBuffer)
		.resize({
			width: width > 300 ? 300 : width,
			height: Math.round((300 / width) * height)
		})
		.webp({ quality: 40 })
		.toBuffer();

	return {
		highQuality,
		thumbnail,
		height,
		width
	};
}
