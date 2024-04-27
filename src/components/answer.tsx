'use client';
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

type AnswerPropsOption = {
  value: number;
  text: string;
};

type AnswerProps = {
  number: number;
  text: string;
  category: string;
  options: AnswerPropsOption[];
  answer: number;
  onChange?: (value: number) => void;
};

const Answer = (props: AnswerProps) => {
  return (
    <div className='flex justify-between align-middle'>
      <div className='flex flex-1 justify-start'>
        <div className='mr-4'>{props.number}.</div>
        <div className='flex flex-1'>{props.text}</div>
      </div>
      <ToggleGroup type='single' value={props.answer + ''}>
        {props &&
          props.options.map((opt: AnswerPropsOption, index: number) => (
            <ToggleGroupItem
              key={`q${props.number}-${index}`}
              value={opt.value + ''}
              onClick={() => props.onChange && props.onChange(opt.value)}>
              {opt.text}
            </ToggleGroupItem>
          ))}
      </ToggleGroup>
    </div>
  );
};

export default Answer;
