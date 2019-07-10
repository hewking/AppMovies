import Stickers from '../../res/Stickers/sticker';
import StickerCategory, { StickerItem } from './stickerCategory';

const PAGE_SIZE = 8;
const DeleteItem = '__emoji_pick_delete__';
const PlaceholderItem = '__emoji_pick_placeholder__';


export default class StickerManager {

    private static instance: StickerManager;

    private constructor() {
        this.loadStickers();
    }

    public static getInstance() {
        if (!StickerManager.instance) {
            StickerManager.instance = new StickerManager();
        }
        return StickerManager.instance;
    }

    private stickerCategories: StickerCategory[] = [];

    public loadStickers() {
        // 可以先clear
        for (const [key, value] of Object.entries(Stickers)) {
            const start = this.stickerCategories.map(item => {
                return item.getPageCount();
            }).reduce((pre, cur) => {
                return pre + cur;
            })

            // place holder
            const stickerArr = Array.from(value);
            if (stickerArr.length < PAGE_SIZE) {
                const gap = PAGE_SIZE - stickerArr.length;
                for (let j = 0; j < gap; j++) {
                    stickerArr.push({
                        name: PlaceholderItem,
                        resource: null,
                    });
                }
            }

            const size = Math.ceil(value.length / PAGE_SIZE);
            const category = new StickerCategory({
                category: key,
                stickers: stickerArr,
                start,
                end: start + size,
            });
            this.stickerCategories.push(category);
        }

        console.log(`loadStickers ${JSON.stringify(this.stickerCategories)}`)

    }

    public getAllStickers(): StickerItem[] {
        return this.stickerCategories.map(cagegory => cagegory.getStickers()).reduce((pre, cur) => {
            return pre.concat(cur);
        })
    }

    public getPageStcikers(page: number): StickerItem[] {

        return [];
    }

}