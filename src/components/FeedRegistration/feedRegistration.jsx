import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import React, { useState } from "react";
import "./feedRegistration.css";

const FeedRegistrationForm = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("other");

  return (
    <Container justify="center">
      <Typography
        varient="h1"
        component="h2"
        gutterBottom
        className="form-heading"
      >
        Create a New Article
      </Typography>
      <form
        onSubmit={(e) => props.handleSubmit(e, { title, content, category })}
      >
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          label="Title"
          variant="outlined"
          fullWidth
          required
          color="secondary"
        />
        <TextField
          onChange={(e) => setContent(e.target.value)}
          className="form-input"
          label="Content"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
        />
        <RadioGroup
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel value="art" control={<Radio />} label="Art" />
          <FormControlLabel
            value="entertainment"
            control={<Radio />}
            label="Entertainment"
          />
          <FormControlLabel
            value="programming"
            control={<Radio />}
            label="Programming"
          />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
export default FeedRegistrationForm;
