'use client';
import Answer from '@/components/answer';
import { useState } from 'react';
import questions from './questions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import rqmImage from './qmt.png';
import Image from 'next/image';

export type AnswerOptionType = {
  value: number;
  text: string;
};

export type AnswerType = {
  text: string;
  category: string;
  answer: number;
};

interface Result {
  category: 'Lógico' | 'Prático' | 'Emocional';
  answer: number;
}

const options: AnswerOptionType[] = [
  { value: 1, text: '1' },
  { value: 3, text: '3' },
  { value: 5, text: '5' },
];

export default function TriadicMentalQuotient() {
  const [answers, setAnswers] = useState<AnswerType[]>(questions);

  const endOfTest = true;
  // answers.filter((answer) => answer.answer === 0).length === 0;

  let categories: Result[] = [
    {
      category: 'Lógico',
      answer: answers.reduce(
        (subTotal, answer) =>
          answer.category === 'Lógico' ? subTotal + answer.answer : subTotal,
        0
      ),
    },
    {
      category: 'Prático',
      answer: answers.reduce(
        (subTotal, answer) =>
          answer.category === 'Prático' ? subTotal + answer.answer : subTotal,
        0
      ),
    },
    {
      category: 'Emocional',
      answer: answers.reduce(
        (subTotal, answer) =>
          answer.category === 'Emocional' ? subTotal + answer.answer : subTotal,
        0
      ),
    },
  ];

  categories = categories.sort((a, b) => b.answer - a.answer);
  console.log(categories);

  const handleChanges = (index: number, value: number, category: string) => {
    // if (endOfTest) return;
    const newAnswer = [...answers];
    newAnswer[index].answer = value;
    setAnswers(newAnswer);
    console.log(index, 'atualizado para', value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quociente Mental Triádico</CardTitle>
        <CardDescription>
          Este teste diversas afirmações, para cada uma delas atribua uma nota
          conforme lista a seguir. Ao responder todos os itens veja o resultado
          no final.
          <div className='flex gap-12 justify-center pt-4 flex-wrap'>
            <div>Fraco: 1</div>
            <div>Médio: 3</div>
            <div>Alto: 5</div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {answers &&
          answers.map((answer, index) => {
            return (
              <Answer
                key={`answer_${index}`}
                {...answer}
                number={index + 1}
                options={[...options]}
                onChange={(value) => {
                  handleChanges(index, value, answer.category);
                }}
              />
            );
          })}
        {endOfTest && (
          <div className='flex flex-col gap-12 space-x-4 rounded-md border p-12 mt-12'>
            <div className='flex flex-col md:flex-row justify-between'>
              <div className='flex flex-col justify-center items-center md:items-start '>
                <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                  Resultado
                </h3>
                <div className='flex flex-col items-center md:items-start'>
                  {categories.map((category: Result, index: number) => (
                    <div key={`result_${index}`}>
                      {category.category} = {category.answer}
                    </div>
                  ))}
                </div>
              </div>
              <div className='hidden md:flex bg-gray-200 w-[1px] mx-8' />
              <div className='md:hidden bg-gray-200 h-[1px] w-full my-8' />
              <div className='flex flex-col items-center'>
                <Image
                  className='object-contain'
                  src={rqmImage}
                  width={300}
                  alt='ilustração mostrando a diferença entre os lados do cérebro'
                />
              </div>
            </div>
            <p>
              O hemisfério com maior pontuação é o dominante.
              <br />
              O hemisfério com segunda maior pontuação é o subdominante.
              <br />O hemisfério com menor pontuação é o complementar.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <CardDescription>
          <strong>Conceito Original:</strong> O Quociente Mental Triádico foi
          desenvolvido por Celso Antunes. Ele introduziu o conceito no livro
          <i>Inteligência Emocional e a Arte de Educar Nossos Filhos</i>,
          focando nas dimensões cognitiva, emocional e moral da inteligência.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
