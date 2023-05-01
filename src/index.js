import { View, Button, TextInput, Text,FlatList, TouchableOpacity, Modal} from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
export default function App() {
const [text, setText] = useState("");
const [events, setEvents] = useState([]);
const [modalVisible, setModalVisible] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);

const onAddEvent = () => {
  if (text.length === 0) return;
  setEvents([
    ...events,
    {
      id: Math.random().toString(),
      value: text,
    }
  ]);
  setText("");
}
console.warn("events", events)
const renderItem = ({item}) =>(
  <TouchableOpacity style={styles.itemContainer} onPress={()=>onHandlerEvent(item.id)}>
     <Text style={styles.item}>{item.value}</Text></TouchableOpacity>)
const onHandlerEvent = (id)=>{
  setModalVisible(true);
  const selectedEvent = events.find(event => event.id === id);
  setSelectedEvent(selectedEvent); 

}
const onHandlerCancelModal=()=>{
  setModalVisible(!modalVisible);
  setSelectedEvent(null);
}
const onHandlerDeleteEvent=(id)=>{
setEvents(events.filter(event => event.id !== id));
setModalVisible(!modalVisible);
}

  return (
    
    <View style={styles.container}>
      <View style={styles.inputContainer}>
       <TextInput placeholder='Ingrese su texto aqui' style={styles.input} value={text} 
       onChangeText={(text) => setText(text)}/>
       <Button title="Add" color="#52528C" onPress={onAddEvent}/>
      </View>
        <View style={styles.listContainer}>
          <FlatList
          renderItem={renderItem}
          data={events}
          keyExtractor={(item)=> item.id}/>
                 
        </View>    
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
             <Text style={styles.modalTitle}>Task Detail</Text>
             <View style={styles.modalDetailContainer}>
              <Text style={styles.modalDetailMessage}>seguro quieres eliminar</Text>
              <Text style={styles.selectedEvent}>{selectedEvent?.value}</Text>
             </View>
             <View style={styles.buttonContainer}>
             <Button
             title= "Cancelar"
             color="#52528C"
             onPress={()=> onHandlerCancelModal()}
             />
             <Button
             title= "Borrar"
             color="#52528C"
             onPress={()=> onHandlerDeleteEvent(selectedEvent.id)}
             />
             </View>
             
             
             </View>
             
             
             </Modal>    
    </View>
  );
}