import { Container, Text } from "pixi.js/lib/core";
import size from "./size";
import { resources } from "./Game";

const font = {
	fontFamily: 'font',
	fontSize: 76,
	fill: 0xFFFFFF,
	align: 'left',
	antiAliased: false
};

export default class TextScene extends Container {
	constructor(text){
		super();
		setTimeout(() => {
			this.text = new Text(text, font);
			this.text.anchor.x = this.text.anchor.y = 0.5;
			this.addChild(this.text);
			this.x = size.x/2;
			this.y = size.y/2;
			resources.dramatic.data.play();
		}, 500);
	}

	update(){}
}
