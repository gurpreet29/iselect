import homeOnly from '../../static/core/0.0.1/images/home.svg';
import contentImage from '../../static/core/0.0.1/images/contents.svg';
import homeandcontentImage from '../../static/core/0.0.1/images/home-contents.svg';
import landlordimage from '../../static/core/0.0.1/images/landlord.svg';
import switchingInsurer from '../../static/core/0.0.1/images/switching-insurers.svg';
import lookingForNewCover from '../../static/core/0.0.1/images/looking-for-a-new-cover.svg';
import editBtn from '../../static/core/0.0.1/images/edit_button.svg';
import customiseIcon from '../../static/core/0.0.1/images/customise.svg';

class ImageLoader {
    constructor() {
        this.images={
          'home.svg': homeOnly,
          'contents.svg': contentImage,
          'home-contents.svg': homeandcontentImage,
          'landlord.svg': landlordimage,
          'switching-insurers.svg': switchingInsurer,
          'looking-for-a-new-cover.svg': lookingForNewCover,
          'customise.svg': customiseIcon
        };
    }

    getImage(imgName) {
        return this.images[imgName];
    }

    getEditImage() {
        return editBtn;
    }
}

export default [ImageLoader];
