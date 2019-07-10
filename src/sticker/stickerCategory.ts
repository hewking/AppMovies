export interface StickerItem {
    name: string;
    resource: any;
}

export default class StickerCategory {

    private category: string;
    private stickers: StickerItem[];
    private start: number;
    private end: number;
    private pageCount: number;

    public constructor(param: { category: string, stickers: StickerItem[], start: number, end: number }) {
        this.category = param.category;
        this.stickers = param.stickers;
        this.start = param.start;
        this.end = param.end;
        this.pageCount = this.end - this.start + 1;
    }

    public getPageCount() {
        return this.pageCount;
    }

    public getStickers() {
        return this.stickers;
    }

    public checkInCategory(index:number): boolean {
        return index >= this.start && index < this.end;
    }

}