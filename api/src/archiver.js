import archiver from 'archiver'
import _ from 'lodash'
import path from 'path'
import Moment from 'moment'
import S3 from './s3'

export default class FileArchiver{

    constructor(app, files = [], response){

        this.app = app;
        this.files = files;
        this.response = response;
    }

    download(){

        const app = this.app;
        const files = this.files;
        const uploadDir = app.get('storageDir');
        const zip = archiver('zip');
        const response = this.response;
        var min = 1;
        var max = 10;
        var rand =  min + (Math.random() * (max-min));

        console.log('download.zip');
        const filenewname = 'download' + rand + '.zip';
        response.attachment(filenewname);
        zip.pipe(response);
        //const s3Downloader = new S3(app, response);
        _.each(files, (file) => {

            //const fileObject = s3Downloader.getObject(file);

            //zip.append(fileObject, {name: _.get(file, 'originalName')});

            const filePath = path.join(uploadDir, _.get(file, 'name'));
            zip.file(filePath, {name: _.get(file, 'originalName')});
        });
        zip.finalize();
        return this;
    }
}