import react from 'react'
import { View, Text } from 'react-native'

export default function WeekIndicator(props){
    
    return(
        <View
            style={{
                flexDirection: 'row'
            }}
        >
            <Text style={{color: props.day == 0 ? '#ccc':'#fff'}} >Seg</Text>
            <Text style={{color: props.day == 1 ? '#ccc':'#fff'}} >Ter</Text>
            <Text style={{color: props.day == 2 ? '#ccc':'#fff'}} >Qua</Text>
            <Text style={{color: props.day == 3 ? '#ccc':'#fff'}} >Qui</Text>
            <Text style={{color: props.day == 4 ? '#ccc':'#fff'}} >Sex</Text>
        </View>
    )
}

