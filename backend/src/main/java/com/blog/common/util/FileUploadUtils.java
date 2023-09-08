package com.blog.common.util;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;

public class FileUploadUtils {
    public static String saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            // 이미지 압축 시작
            BufferedImage inputImage = ImageIO.read(inputStream);

            Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(StringUtils.getFilenameExtension(fileName));
            ImageWriter writer = writers.next();

            Path compressedFilePath = uploadPath.resolve("compressed_" + fileName); // 압축된 파일 경로
            ImageOutputStream outputStream = ImageIO.createImageOutputStream(compressedFilePath.toFile());
            writer.setOutput(outputStream);

            ImageWriteParam params = writer.getDefaultWriteParam();
            params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            params.setCompressionQuality(0.5f);

            writer.write(null, new IIOImage(inputImage, null, null), params);

            outputStream.close();
            writer.dispose();
            // 이미지 압축 끝

            return compressedFilePath.toString();
        } catch (IOException ex) {
            throw new IOException("Could not save file: " + fileName, ex);
        }
    }

    public static void cleanDir(String dir) {
        Path dirPath = Paths.get(dir);

        try {
            Files.list(dirPath).forEach(file->{
                if(!Files.isDirectory(file)) {
                    try {
                        Files.delete(file);
                    }catch(IOException ex) {
                        System.out.println("Could not delete file : " + file);
                    }
                }
            });
        }catch(IOException ex2) {
            System.out.println("Could not list directory : " + dirPath);
        }
    }
}
