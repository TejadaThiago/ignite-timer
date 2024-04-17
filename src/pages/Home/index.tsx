import {  useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { HandPalm, Play } from "phosphor-react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import {  HomeContainer, StartCountdownButton, StoptCountdownButton } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";



const newCicleFormValidationShcema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1, 'O ciclo precisa ser de no minimo 5 minutos')
                             .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCicleFormValidationShcema>
//constroi a tipagem a partir do zod,

export function Home(){

   const { activeCycle, createNewCycle, interruptedCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCicleFormValidationShcema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)

    reset()
    //funcao para deixar a funcao 'reset' da biblioteca react-hook-form desaclopada do contexto
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StoptCountdownButton onClick={interruptedCurrentCycle} type="button">
          <HandPalm size={24}/>
          Interromper
        </StoptCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>
        ) }
      </form>
    </HomeContainer>
  )
}