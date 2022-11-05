import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  downloadText = "";
  constructor(private firebase: FirebaseService, public loadingController: LoadingController) { }



  handleDownloadImage() {

  }

  async fileUpload(files, num) {
    if (files.length === 0) {
      return;
    }
    var file = files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log( evt.target.result);
            document.getElementById("uploadedText").innerHTML = evt.target.result.toString();
        }
        reader.onerror = function (evt) {
            document.getElementById("uploadedText").innerHTML = "error reading file";
        }
    }

    if (files) {
      console.log('ok');
      const loading = await this.loadingController.create({
        message: 'Loading',
      });
      loading.present();
      this.firebase.uploadFile(files[0], 'text').then(data => {
        console.log('data', data);
        this.downloadText = data.downloadUrl;
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
