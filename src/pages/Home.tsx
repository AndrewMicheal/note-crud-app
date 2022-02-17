import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonIcon, IonButtons , IonButton,useIonToast } from '@ionic/react';
import './Home.css';
import axios from "axios"
import { useState , useEffect } from 'react';
import {createOutline , trashOutline} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useIsMounted } from './useIsMounted';


const Home: React.FC = () => {
  const [allNotes , setAllNotes] = useState([]);
  const [count , setCount] = useState(0);
  const [present, dismiss] = useIonToast();

  const isMounted = useIsMounted();

  const history = useHistory();

  async function getAllData() {
    let {data}:any = await axios.get("http://localhost:3000/getAllNotes");
    if(isMounted.current) {
      setAllNotes(data.data)
    } else {
      console.log("no")
    }
  }
  
  useEffect(() => {
    getAllData();
  },[allNotes]);

  function showMessage(msg:any) {
    present(`${msg}`, 500)
  }

  function goToEditNote(id:any) {
    history.push(`/editNote/${id}`)
  }

  async function deleteNote(noteId:any) {
    console.log(noteId)
    let {data} = await axios.delete(`http://localhost:3000/deleteNote/${noteId}`);
    if(data.message === "deleted") {
      showMessage(data.message);
      getAllData();
    }
  }

  function goToAddNote() {
    history.push("/addNote")
  }

 
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
          <IonButton slot = "end" onClick = {goToAddNote}>Add Note</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       {allNotes.length !== 0 ? allNotes.map((note:any , index:any)=> {
         return(
           <IonList key = {index}>
             <IonItem>
                <IonLabel>Title : {note.title}</IonLabel>
                <IonLabel>Desc : {note.note_desc}</IonLabel>
                <IonButtons  slot ="end">
                  <IonButton onClick = {()=>goToEditNote(note.id)}>
                    <IonIcon icon = {createOutline}></IonIcon>
                  </IonButton>
                  <IonButton onClick = {()=>deleteNote(note.id)}>
                    <IonIcon icon = {trashOutline}></IonIcon>
                  </IonButton>
                </IonButtons>
             </IonItem>
            </IonList>
         );
       }) : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;
