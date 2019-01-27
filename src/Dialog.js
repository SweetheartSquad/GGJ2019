import game, { resources } from "./Game";

const pitches = {
	"fella" : 0.7,
	"dame" : 2,
	"oldGuy": 0.5,
	"scout" : 1.5,
	"father" : 1,
	"whizkid": 1.7,
	"editor": 1.2,
};

export function createDialog(npc, {
	label = 'talk',
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
				resources.talk.data.rate(pitches[npc.name], id);
			} else {
				npc.saying = '';
			}
			if (i < lines.length - 1) {
				++i;
			}
		}
	}
}
