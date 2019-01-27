import game, { resources } from "./Game";

export function createDialog(npc, {
	label = '',
	lines = [],
}) {
	let i = 0;
	return {
		onEnter: () => {
			npc.saying = label;
		},
		onExit: () => {
			npc.saying = '';
		},
		onInteract: () => {
			const saying = lines[i];
			if(npc.saying !== saying) {
				npc.saying = saying;
				npc.s += 0.2;
				const id = resources.talk.data.play();
				resources.talk.data.rate(npc.pitch, id);
			} else {
				npc.saying = '';
			}
			if (i < lines.length - 1) {
				++i;
			}
		}
	}
}
