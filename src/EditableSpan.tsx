import React, {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEitMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEitMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEitMode(false)
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField value={title}
                         onChange={onChangeTitleHandler}
                         onBlur={activateViewMode}
                         autoFocus    // autoFocus по определению будет true
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}