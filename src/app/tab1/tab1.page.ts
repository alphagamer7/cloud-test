import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  downloadImage = "";
  constructor(private firebase: FirebaseService, public loadingController: LoadingController) { }



  handleDownloadImage() {

  }

  async imageUpload(files, num) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    if (files) {
      console.log('ok');
      const loading = await this.loadingController.create({
        message: 'Loading',
      });
      loading.present();
      this.firebase.uploadFile(files[0], 'image').then(data => {
        console.log('data', data);
        this.downloadImage = data.downloadUrl;
        loading.dismiss();
        console.log("");
      }).catch(err => {
        console.log(err);
        loading.dismiss();
      })
    } else {
      console.log('no');
    }
  }

}
