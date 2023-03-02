import React, {useState} from "react";
import { useQuery, gql, useMutation } from '@apollo/client';
import "../styles/PopupContent.css";

const ITEM_QUERY = gql`
  query ItemQuery($id: String!) {
    message(id: $id) {
      id
      author {
        login
      }
      subject
      body
      language
      metrics {
        views
      }
      view_href
      post_time
    }
  }
`;

const UPDATE_MUTATION = gql`
mutation UpdateMutation($id: String!, $subject: String!, $body: String!) {
  updateMessage(input: {
    id: $id
    subject: $subject
    body: $body
  }) {
    id
    subject
    body
  }
}
`;

const PopupContent = (props) => {
    const {details} = props;
    const [isSubjectReadOnly, setSubjectStatus] = useState(true);
    const [isBodyReadOnly, setBodyStatus] = useState(true);
    const [formSubject, setSubject] = useState('');
    const [formBody, setBody] = useState('');

    const {loading, error, data} = useQuery(ITEM_QUERY, {
        variables: {id: details,},
        onCompleted: (data) => {
          const {message} = data;
          const { subject, body} = message;
          setSubject(subject);
          setBody(body);
        }
    });

    const [mutateFunction] = useMutation(UPDATE_MUTATION,{
      variables: {
        id: details,
        subject: formSubject,
        body: formBody
      },
      onCompleted: (data) => {
        console.log(data);
      }
    });

    const onClickEdit = () => {
      setReadStatus(!isReadOnly);
    }

    const onSubmitForm = (e) => {
      e.preventDefault();
      mutateFunction();
    }

      const renderData = () => {
        const {message} = data;
        const {id, author, language, metrics, view_href, post_time} = message;

        return (<form onSubmit={onSubmitForm}>
        <label htmlFor="id">ID:</label><br/>
        <input type="text" defaultValue={id} id="id" 
          readOnly className="input"/><br/>
        <label htmlFor="author">AUTHOR:</label><br/>
        <input type="text" defaultValue={author.login} id="author"
          readOnly className="input"/><br/>
        <label htmlFor="subject">SUBJECT:</label><br/>
        <input type="text" value={formSubject} id="subject"
          onChange={(e) => {setSubject(e.target.value)}}
          onFocus={() => {setSubjectStatus(false)}}
          onBlur={() => {setSubjectStatus(true)}}
          className={`input ${isSubjectReadOnly? "":"border"}`}/><br/>
        <label htmlFor="body">BODY:</label><br/>
        <input type="text" value={formBody} id="body" 
          onChange={(e) => {setBody(e.target.value)}}
          onFocus={() => {setBodyStatus(false)}}
          onBlur={() => {setBodyStatus(true)}}
          className={`input ${isBodyReadOnly? "":"border"}`}/><br/>
        <label htmlFor="language">LANGUAGE:</label><br/>
        <input type="text" defaultValue={language} id="language"
          readOnly className='input'/><br/>
        <label htmlFor="views">VIEWS:</label><br/>
        <input type="text" defaultValue={metrics.views} id="views"
         readOnly className='input'/><br/>
        <label htmlFor="link">LINK:</label><br/>
        <a href={view_href} target="_blank">{view_href}</a><br/>
        <label htmlFor="postTime">POST TIME:</label><br/>
        <input type="text" defaultValue={post_time} id="postTime"
          readOnly className='input'/><br/>
        <button type="submit">Update</button>
      </form>)
      } 


    if (loading) return <p>...loading</p>
    if (error) return <p>error: {error.message}</p>

    return data && renderData();
}

export default PopupContent;