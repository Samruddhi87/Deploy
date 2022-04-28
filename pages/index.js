// our-domain.com
import Head from 'next/head'
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from 'react';
// const DUMMY_MEETUPS=[
//     {
//         id:'m1',
//         title:'A first Meetup',
//         image:'https://www.tajmahal.gov.in/images/gallery/taj-mahal/big/7.jpg',
//         address:'some address ',
//         description:'this is 1st meetup'
//     },
//     {
//         id:'m2',
//         title:'A 2nd Meetup',
//         image:'https://www.treebo.com/blog/wp-content/uploads/2020/09/Satara-1.jpg',
//         address:'some address 144878',
//         description:'this is 2nd meetup'
//     },
// ]

function HomePage(props){
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
 
    return(
        <Fragment>
<Head> <title>React Meetups </title>
<meta name='descr' content='browse a huge list of highly' />
</Head>
        <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}
export async function getStaticProps(){
    // fetch('/api/meetups');
    const client = await MongoClient.connect('mongodb+srv://samruddhi:samarekar87@cluster0.ejrxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
    
   const meetups= await meetupsCollection.find().toArray();
   client.close();   
   return{
        props:{
             meetups:
             meetups.map((meetup)=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            }))
        },
        revalidate:1
    }
}
export default HomePage;