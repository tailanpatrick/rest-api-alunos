import { IsNotEmpty } from 'class-validator';
import appConfig from "../config/appConfig";

export default class Photo {

    id: string;

    @IsNotEmpty()
    originalName: string;

    @IsNotEmpty()
    fileName: string;

    @IsNotEmpty()
    get filePath(): string {
        return `${appConfig.url}/images/${this.fileName}`
    }


    constructor(
        id: string,
        originalName: string,
        fileName: string,
        
    ) {
        this.id = id;
        this.originalName = originalName;
        this.fileName = fileName;

    }
}