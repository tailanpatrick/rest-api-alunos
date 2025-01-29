import { IsNotEmpty } from 'class-validator';

export default class Photo {

    id: string;

    @IsNotEmpty()
    originalName: string;

    @IsNotEmpty()
    fileName: string;

    @IsNotEmpty()
    filePath: string;

    constructor(
        id: string,
        originalName: string,
        fileName: string,
        filePath: string,
    ) {
        this.id = id;
        this.originalName = originalName;
        this.fileName = fileName;
        this.filePath = filePath;
    }
}
