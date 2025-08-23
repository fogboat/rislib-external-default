import React, { useState } from "react";
import { RichTextEditor } from 'lib1';


 const Form = ({editor}:any) => {
  React.useEffect(() => {
    console.log('Button mounted1');

  }, []);
  return (
    <RichTextEditor  />

  );
};



export default Form;