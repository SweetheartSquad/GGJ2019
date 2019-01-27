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
			npc.saying = lines[i];
			if (i < lines.length - 1) {
				++i;
			}
		}
	}
}
