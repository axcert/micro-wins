import React from 'react';
import { List } from 'react-native-paper';

const TipAccordion = ({ tips }) => {
  return (
    <List.Accordion
      title="Tips"
      left={props => <List.Icon {...props} icon="lightbulb-outline" />}
    >
      {tips.map((tip, index) => (
        <List.Item key={index} title={tip} />
      ))}
    </List.Accordion>
  );
};

export default TipAccordion;