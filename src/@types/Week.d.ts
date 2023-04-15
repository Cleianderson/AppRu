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

declare type RootState = {
    mainState: MainState,
    requestState: RequestState,
    storageState: Storage
}

declare type MainState = {
    warns: WarningType[] | undefined, // setWarns: Dispatch<SetStateAction<WarningType[] | undefined>>
    foods: Table[] | undefined, // setFoods: Dispatch<SetStateAction<Table[] | undefined>>
    week?: Week, // setFoods: Dispatch<SetStateAction<Table[] | undefined>>
    favorites: string[] | undefined, //  setFavorites: Dispatch<SetStateAction<string[]>>,
    day: number | undefined, // setDay: (d: number) => void,
    // homeViewPage: JSX.Element | undefined, //  setHomeViewPage: Dispatch<SetStateAction<JSX.Element | undefined>>,
    homeView: JSX.Element | undefined, //  setHomeViewPage: Dispatch<SetStateAction<JSX.Element | undefined>>,
    // addFavorites: (str: string) => Promise<void>,
    // removeFavorites: (str: string) => void,
    thereIsWarn: boolean, // setThereIsWarn: Dispatch<SetStateAction<boolean>>,
    // updateThereIsWarn: (bool: boolean) => {},
}

declare type RequestState = {
    action: string | undefined,
    textSuccess: string,
    textFailed: string,
    isVisible: boolean,
    isRequesting: boolean | undefined,
    success: boolean | undefined
}
