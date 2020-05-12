import React, {useState} from 'react'
import {Container, Text, Content} from './styles'
import Expandable from './components/Expandable'

const Infos = [
  {
    title: 'Como o aplicativo atualiza as semanas?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in luctus magna, in fringilla turpis. Vestibulum eget nisi ipsum. Integer in pretium orci. Nam a laoreet augue, eu mattis nibh. Mauris hendrerit turpis magna, et viverra justo gravida eget. Proin eget justo venenatis ante lacinia malesuada accumsan at urna. Donec ac libero erat. Duis elementum nec massa non molestie.',
  },
  {
    title: 'Quem envia os cardápios e os avisos?',
    content: 'Quisque sit amet justo arcu. Nunc at massa justo. Aenean auctor ut erat a egestas. Sed pretium aliquet magna, id rutrum ex. In quis faucibus quam. Integer semper facilisis lobortis. Ut tincidunt arcu sit amet fringilla egestas. Sed non consequat nunc. Maecenas in placerat ante. Aliquam imperdiet velit quis massa condimentum, eu vehicula nisl sollicitudin. Ut nisi elit, molestie ut nisl a, rhoncus dapibus est. Donec sed enim velit.',
  },
  {
    title: 'A quem pertence o aplicativo?',
    content: 'Morbi et tempus velit, a rhoncus turpis. Quisque sit amet sapien eget sapien fringilla mollis vitae et neque. Aenean eu dui ac ligula maximus rhoncus. In quis porta metus. Quisque consectetur elementum magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus vehicula lorem nec viverra.',
  },
  {
    title: 'Como a Beatriz pode ser tão linda?',
    content: '',
  },
]

const Info = () => {
  return (
    <Container>
      <Content>
        {Infos.map(({title, content}, index) => (
          <Expandable key={String(index + title)} title={title} content={content} />
        ))}
      </Content>
    </Container>
  )
}

export default Info
