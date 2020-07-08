type Configs = {
    showIndicator: boolean
    showDateOnIndicator: boolean
}

type ConfigAction = {
    type: 'UPDATE_CONFIG'
    data: any
}

type ConfigsReducer = (state: Configs, action: ConfigAction) => Configs
