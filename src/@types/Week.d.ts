declare type Table = {
    [key: string]: string | {
        suc: string,
        p1: string,
        p2: string,
        gua: string,
        sob: string,
        veg: string,
        gre: string,
        fag: string,
        sal: string,
        sco?: string,
        sopa?: string
    }
}

declare type Week = {
    data: Table[],
    // eslint-disable-next-line camelcase
    number_week: number,
    year: number
}
