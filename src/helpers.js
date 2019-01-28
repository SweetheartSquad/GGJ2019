import { Point } from "pixi.js/lib/core/math";
import { player, setScene, activeScene } from "./main";
import ObservationScene from "./ObservationScene";

export function toInterior(Scene) {
	return {
		points: [
			new Point(-580, 100),
			new Point(-500, 100),
			new Point(-500, 400),
			new Point(-580, 400),
		],
		onEnter: () => {
			setTimeout(() => {
				setScene(new Scene());
				// hallway entrance
				player.p.x = 424;
				player.p.y = 235;
			});
		},
	};
}

export function toObservation() {
	return {
		points: [
			new Point(-60, 50),
			new Point(60, 50),
			new Point(60, 80),
			new Point(-60, 80),
		],
		onEnter: () => {
			const scene = activeScene;
			setTimeout(() => {
				setScene(new ObservationScene(activeScene));
				// stairs
				player.p.x = 159;
				player.p.y = 164;
			});
		},
	};
}

export function toExterior(Scene) {
	return {
		points: [
			new Point(500, 100),
			new Point(450, 100),
			new Point(450, 400),
			new Point(500, 400),
		],
		onEnter: () => {
			setTimeout(() => {
				setScene(new Scene());
				// hallway exit
				player.p.x = -480;
				player.p.y = 240;
			});
		},
	};
}

export function toNextDay(Scene, day) {
	return {
		points: [
			new Point(-480, 100),
			new Point(-380, 100),
			new Point(-380, 250),
			new Point(-480, 250),
		],
		onEnter: () => {
			player.saying = 'Go to bed.';
		},
		onExit: () => {
			player.saying = '';
		},
		onInteract: () => {
			player.saying = '';
			setTimeout(() => {
				setScene(new Scene(), day);
				// at stairs
				player.p.x = 12;
				player.p.y = 144;
			});
		}
	};
}
