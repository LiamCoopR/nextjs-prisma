import React, { useEffect, useState } from "react";
import { createJob } from '../../api2';
import styles from './AddJob.module.css';

export const AddJobFold = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.addJobFoldContainer}>
      <div className={styles.addJobIcon}>
        <div 
          className={styles.circle}
          onClick={() => setShow(!show)} 
        >
          <p>+</p>
        </div>
        <p>Add a job</p>
      </div>
      {show && <AddJobItem closeFold={() => {setShow(false)}} /> }
    </div>
  )
}

const AddJobItem = ({ closeFold }) => {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [applied, setApplied] = useState(false)
  const [notes, setNotes] = useState('')
  const [contact, setContact] = useState('')
  const [datePosted, setDatePosted] = useState('');
  const [dateClosed, setDateClosed] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState([]);
  const handleTags = (arg: string[]) => setTags(arg)

  const submitForm = () => {
    createJob(
      title, 
      description, 
      company, 
      applied, 
      contact, 
      notes,
      datePosted,
      dateClosed,
      location,
      link,
      tags,
    );

    setTitle('')
    setCompany('')
    setDescription('')
    setApplied(false)
    setNotes('')
    setContact('')
    setDatePosted('');
    setDateClosed('');
    setLocation('');
    setLink('');
    setTags([]);

    closeFold()
  }

  return (
    <form
      className={styles.addJob}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      onSubmit={e => {
        e.preventDefault()
        submitForm()
      }}
    >
      <input 
        className={`${styles.input} ${styles.inputTitle}`}
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputCompany}`}
        placeholder="Company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputLocation}`}
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputLink}`}
        placeholder="Link"
        value={link}
        onChange={e => setLink(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDescription}`}
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDatePosted}`}
        placeholder="Post Date"
        value={datePosted}
        onChange={e => setDatePosted(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputDateClosed}`}
        placeholder="Close Date"
        value={dateClosed}
        onChange={e => setDateClosed(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputNotes}`}
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <input 
        className={`${styles.input} ${styles.inputContact}`}
        placeholder="Contact"
        value={contact}
        onChange={e => setContact(e.target.value)}
      />
      <TagsInput tags={tags} handleTags={handleTags} />
      <div>
        <input 
          type="checkbox" 
          checked={applied}
          value="applied"
          onChange={e => setApplied(!applied)}
        />
        <label htmlFor="applied">Applied</label>
        <button className={styles.addJobButton} >
          Add Job
        </button>
      </div>
    </form>
  );
}


const TagsInput: React.FC<{ tags: string[], handleTags: (arg: string[]) => void}> = 
({ tags, handleTags }) => {
  const [text, setText] = useState('');
  const [unique, setUnique] = useState(true);

  useEffect(() => {
    const resetUnique = () => {
      handleTags(tags.filter((item, pos) => tags.indexOf(item) === pos))
      setUnique(true)
    }
    if(!unique) resetUnique
  }, [unique])

  return (
    <div className={styles.tagContainer}>
      <div>
        <input
          className={styles.tagInput}
          type="text"
          placeholder="tags"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              handleTags([...tags, text])
              setUnique(false)
              setText('')
            }
          }}
        />
      </div>
      <div className={styles.tagsContainer}>
        {tags.map((tag, idx) => (
          <div className={styles.tagCont}>
            <p className={styles.removeTag}
              onClick={() => handleTags(
                tags.filter((t, iidx) => idx !== iidx))
              }
            >
              x
            </p>
            <p>{tag}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
