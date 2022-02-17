import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar,useIonToast } from '@ionic/react';
import axios from "axios"
import { useEffect , useRef } from 'react';
import { useHistory } from 'react-router';


const AddNote: React.FC = () => {
  const history = useHistory();
  const title = useRef("");
  const desc = useRef("");
  const [present, dismiss] = useIonToast();

  useEffect(()=> {
    title.current = "";
    desc.current = ""
    console.log("title: "+title.current)
  },[])
  let note:any = {
      title:"" ,
      note_desc:""
  }
  
  function getNoteData(e:any) {
      note[e.target.name] = e.target.value;
  }
  function showMessage(msg:any) {
    present(`${msg}`, 500)
  }
  async function sendData(e:any) {
    e.preventDefault();
      let {data} = await axios.post("http://localhost:3000/addNote",note);
      e.target.reset();
      if(data.message === "added") {
        showMessage(data.message);
          history.push("/home")
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
          <form onSubmit = {sendData}>
              <IonItem>
                  <IonLabel>Title</IonLabel>
                  <IonInput value = {title.current} onKeyUp = {getNoteData} type = "text" name = "title"/>
              </IonItem>
              <IonItem>
                  <IonLabel>description</IonLabel>
                  <IonInput value = {desc.current} onKeyUp = {getNoteData} type = "text" name = "note_desc"/>
              </IonItem>
              <IonButton type = "submit">Add Note</IonButton>
          </form>
      </IonContent>
    </IonPage>
  );
};

export default AddNote;
