class Image {

    imagesDir = "/assets/img/"
    name;
    extension;
    sizes = ['1x', '2x'];
    image;
    alt = "";
    urls = [];

    constructor(data) {
        let parts = data.split(" ")
        if(parts.length === 2){
            this.alt = parts[1];
        }
        this.image = parts[0];
        this.setParts()
    }

    getImage(){
        return this.imagesDir+this.image;
    }
    getAltAttribute(){
        return this.alt;
    }

    setParts() {
        let position = this.image.lastIndexOf(".")
        this.name = this.image.slice(0, position);
        this.extension = this.image.slice(position + 1);
        return this
    }

    generateSrcset() {
        this.sizes.map(size => {
            let url = this.imagesDir + (size !== "1x" ?
                this.name + "@" + size + "." + this.extension + " " + size :
                this.image + " " + size);
            this.urls.push(url)
        });
        return this.urls.join(", ")
    }
}

module.exports = function (options) {

    const img = new Image(options.fn(this));
    const srcSet = img.generateSrcset();

    return `
        <picture>
            <source srcset="${srcSet}">
            <img src="${img.getImage()}" alt="${img.getAltAttribute()}">
        </picture>`;
}
