export function createDialog(npc, {
	label = '',
	lines = [],
}) {
	let i = 0;
	return {
		onEnter: () => {
			npc.text.text = label;
		},
		onExit: () => {
			npc.text.text = '';
		},
		onInteract: () => {
			npc.text.text = lines[i];
			if (i < lines.length - 1) {
				++i;
			}
		}
	}
}
