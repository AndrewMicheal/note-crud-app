import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar,useIonToast } from '@ionic/react';
import axios from "axios"
import { useState , useEffect } from 'react';
import { useParams , useHistory } from 'react-router';


const EditNote: React.FC = () => {
  const params:any = useParams();
  const history = useHistory();
  const [noteTitle , setNoteTitle] = useState("");
  const [noteDesc , setNoteDesc] = useState("");
  const [present, dismiss] = useIonToast();

  useEffect(()=> {
      async function getNote(){
          let {data} = await axios.get(`http://localhost:3000/getNote/${params.id}`);
          await setNoteTitle(data.data[0].title);
          await setNoteDesc(data.data[0].note_desc);
      }
      getNote();
  },[])

  let note:any = {
      title: noteTitle ,
      note_desc: noteDesc
  }
  function getNoteData(e:any) {
      note[e.target.name] = e.target.value;
      console.log(note);
  }
  function showMessage(msg:any) {
    present(`${msg}`, 500)
  } 
  async function sendData() {
      let {data} = await axios.put(`http://localhost:3000/updateNote/${params.id}`,note);
      if(data.message === "updated") {
        showMessage(data.message);
          history.replace("/home");
      }
  }
  return (
      
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <form>
              <IonItem>
                  <IonLabel>Title</IonLabel>
                  <IonInput value = {noteTitle} onKeyUp = {getNoteData} type = "text" name = "title"/>
              </IonItem>
              <IonItem>
                  <IonLabel>description</IonLabel>
                  <IonInput value = {noteDesc!==""?noteDesc:""} onKeyUp = {getNoteData} type = "text" name = "note_desc"/>
              </IonItem>
              <IonButton onClick = {sendData}>Edit Note</IonButton>
          </form>
      </IonContent>
    </IonPage>
  );
};

export default EditNote;
