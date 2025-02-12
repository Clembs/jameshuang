import { Node, mergeAttributes } from '@tiptap/core';

export const Video = Node.create({
	name: 'video',
	content: 'inline*',
	group: 'block',
	inline: false,
	selectable: true,
	draggable: true,
	atom: true,
	addAttributes() {
		return {
			...this.parent?.(),
			src: {
				default: null
			},
			muted: true,
			autoplay: true,
			controls: {
				default: true,
				autoplay: true,
				loop: true,
				muted: true,
				playsinline: true
			}
		};
	},
	parseHTML() {
		return [
			{
				tag: 'video'
			}
		];
	},
	renderHTML({ HTMLAttributes }) {
		return ['video', mergeAttributes(HTMLAttributes)];
	}
});
