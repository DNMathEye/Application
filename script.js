// Welcome to the "game" code. Well, there is another game, of course,
// but I couldn't resist doing a mini text adventure for the website portion.

// The code is largely copied over from the YouTube tutorial I list in resources,
// but with my requirement that I hand type everything and make sure I understand
// what it's doing. That said, there's a little customization as well.

// Of course the css is custom. Additionally, I wanted a couple of pieces of text
// in different html divs, hence the "atext" and "btext".

// The original tutorial has extra code to manage a state that updates with
// certain actions and alters dialogue options accordingly. It wasn't necessary for this,
// so I cut those parts out.

const atextElement = document.getElementById('atext')
const btextElement = document.getElementById('btext')
const dialogueButtonsElement = document.getElementById('dialogue-options')

function startTree() {
    showTextNode('start')
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    atextElement.innerText = textNode.atext
    btextElement.innerText = textNode.btext
    while (dialogueButtonsElement.firstChild) {
        dialogueButtonsElement.removeChild(dialogueButtonsElement.firstChild)
    }

    textNode.opts.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        dialogueButtonsElement.appendChild(button)
    })
}

  
function selectOption(option) {
    const nextTextNodeId = option.id
    // if (nextTextNodeId <= 0) {
    //     return startTree()
    //   }
    showTextNode(nextTextNodeId)
}


// Oh boy, I think I'm going to have to fiddle about here. (writing this as I'm considering the options)
// At first I was just looking at editing the design in the tutorial and inputting my text and the responses
// However, it's pretty clunky and unreadable writing prose in the js code
// After looking it up, I realised I can use a JSON to store the text for the dialogue tree,
// which lets me learn about JSONs as well! Yay! I am running a bit low on time, but I think it's doable...

// OK it ended up being a bit of a dead end, mainly because it's tricky to use a local
// JSON file, which I need to do while testing locally. I think I know how I would do it,
// with each id having child atext and btext, and then just draw from that into textNodes
// For now, though, since time is pressing, I will just put the text into the big array

// As I'm doing this, I can see there's a lot of redundancy. With more time, I'm sure I could
// come up with a better way to store and navigate the data that makes up the questions and texts

// Well it took a good while, but I managed it. Definitely more efficient ways to do this, which
// I may well look into in the future.

const textNodes = [
    {
      id: 'start',
      atext: '> Hello... my name is David',
      btext: "You can't be sure how this application got on the terminal, let alone how it started up on it's own. \n\n Your colleague glances over, curious. She watches as you, hesitatingly, type out a reply on the keyboard.",
      opts: [
        {
            text: '> who is this?', id: 'who'
        },
        {
            text: '> what is this application?', id: 'what'
        },
        {
            text: '> help', id: 'help'
        },
        {
            text: '> exit', id: 'exit'
        }

      ]
    },
    {
        id: 'exit',
        atext: "> Hmm, you want to 'exit' this application? I won't stop you. I've listed everything in the overview at the end if you skip ahead. Everything I've got to say will be there, albeit less interactive :)",
        btext: "Whatever this is, it's responding to you. Whether live or prewritten, you can't tell. \n\n You're not sure what came over you. Of course you can exit any time you want. \n\n The green smiley thrums happily. More questions are invited.",
        opts: [
          {
              text: '> who is this?', id: 'who'
          },
          {
            text: '> what is this application?', id: 'what'
          }
        ]
      },
      {
        id: 'help',
        atext: "> Oh I'd love to help you, but actually I'm asking you to help me. This is my application, after all.",
        btext: "An application? Realisation dawns. It's for the programme, of course. \n\n It's a little late, but it's technically just on time. It's almost 2025.",
        opts: [
          {
              text: '> who is this?', id: 'who'
          },
          {
              text: '> where did you hear about us?', id: 'where'
          }
        ]
      },
      {
        id: 'what',
        atext: "> Ah, well, this is my application for the Founders and Coders programme, starting in 2025. I know we're near the deadline, but I hope I can answer all of your questions here. Pleased to meet you :)",
        btext: "Of course, the programme. You don't know why it didn't occur to you instantly. That's exactly who would set up an application like this: an applicant.",
        opts: [
          {
              text: '> who is this?', id: 'who'
          },
          {
              text: '> where did you hear about us?', id: 'where'
          },
          {
              text: '> you almost missed the deadline', id: 'cutclose'
          }
        ]
      },
      {
        id: 'where',
        atext: "> Founders and Coders has actually been on my radar for several years, and a friend of mine is an alumni. I only just now committed to applying. I almost applied the last couple of years but couldn't promise the time commitment.",
        btext: "Fair enough, you think. However, the time commitment is a pretty important factor, so it's not ideal to open with an explanation of one's lack of time. With an application so close to the deadline, no less.",
        opts: [
          {
              text: '> who is this again?', id: 'who'
          },
          {
              text: '> you nearly missed the deadline', id: 'cutclose'
          },
          {
              text: "> are you sure you have the time now?", id: 'time'
          }
        ]
      },
      {
        id: 'who',
        atext: "> My name is David Matthai, and I'm a 36 year old writer living in East London. This is my application to join the Founders and Coders program in 2025. \n\n Pleased to meet you, and I hope I can answer all your questions today :)",
        btext: "With a small start, you hear breathing behind you and realise that your colleague has joined you near the terminal. \n\n 'An application? A little late in the day,' she says. 'Still, it's within the deadline. Are you talking to them live?'",
        opts: [
          {
              text: "> a little late in the day, don't you think", id: 'cutclose'
          },
          {
              text: '> what kind of writer?', id: 'writer'
          },
          {
              text: '> do you have any experience in development?', id: 'devexp'
          },
          {
              text: '> tell us about your work experience', id: 'work'
          }
        ]
      },
      {
        id: 'cutclose',
        atext: "> I know, I've cut it rather close, haven't I? I will say, I've worked quite hard on this, both in making the time and the quality of reading and study I've put in. \n\n I hope this late submission isn't too troublesome for you.",
        btext: "",
        opts: [
          {
              text: '> give me your details again', id: 'who2'
          },
          {
              text: '> the time commitment is very important', id: 'time'
          }
        ]
      },
      {
        id: 'time',
        atext: "> I am certain I can promise the time commitment now. I can get into what the time demands were if you want later. \n\n Ironically, the cause of the lack of time is also my reason for being quite motivated to make a career in programming.",
        btext: "'What's this guy's name again?' your colleague asks. Even if it's a late submission, it's something a little different in terms of applications, you think.",
        opts: [
          {
            text: '> could you remind me your name again?', id: 'who2'
          }
        ]
      },
      {
        id: 'who2',
        atext: "> David Matthai, 36 year old writer, aspiring developer, applying for Founders and Coders 2025, at your service!",
        btext: "Time for some more questions, you suppose.",
        opts: [
          {
              text: "> tell us about your development experience?", id: 'devexp'
          },
          {
              text: "> tell us about your work history?", id: 'work'
          },
          {
              text: '> what sort of thing do you write?', id: 'writer'
          }
        ]
      },
      {
        id: 'writer',
        atext: "> Well, I call myself a writer, fairly I think, but I couldn't call it a career yet - I haven't published anything. I write fantasy and sci-fi mainly. \n\n Career-wise I tutor mathematics and piano on and off. I write as a hobby, and I tutor for money, but right now I'm motivated to learn development and get employment in development as well.",
        btext: "Fantasy and sci-fi. That's a pretty wide genre these days. You recall a friend of yours who writes about mermaids who fall in love with birdmen. You shake away the thought. Now's probably not the time for that distraction.",
        opts: [
          {
              text: "> do you have much development experience?", id: 'devexp'
          },
          {
              text: "> you mention you tutor, what else have you done for work?", id: 'work'
          }
        ]
      },
      {
        id: 'work',
        atext: "> It's a fair question, because my employment history is patchy. I value being (brutally) honest about my work history and the reasons for it. I was at university for a long while, pursuing a PhD that I eventually dropped out of due to mental health concerns. \n\n Then of course, everything with Dad. \n\n I kept working on my writing and got into learning some programming, but nothing translated into a career path during this time.",
        btext: "",
        opts: [
          {
              text: "> how much programming have you done?", id: 'devexp'
          },
          {
              text: "> what happened with your dad?", id: 'dad'
          },
          {
              text: "> what were the mental health concerns?", id: 'ment1'
          },
        ]
      },
      {
        id: 'ment1',
        atext: "> I don't mind talking about it as long as you're comfortable hearing it! I always feel a bit conflicted about sharing this stuff, not out of personal embarrassment or shame, but because it can be a bit trendy to wear these things as badges of honour, which is a little gauche. \n\n However, I also think it's good to combat stigma, and provide visibility and guidance for others. As for the application, I just like to be honest with what I'm putting forward, though I also don't want to overstate it as a factor. \n\n So, yes, I can tell you more if you want, or we can skip it and talk about something else.",
        btext: "",
        opts: [
          {
              text: "> hit me", id: 'ment2'
          },
          {
              text: "> tell us about your development experience", id: 'devexp'
          }
        ]
      },
      {
        id: 'ment2',
        atext: "> Well, in the long run, I've been diagnosed with bipolar disorder, and ADHD. The good news now is I'm very healthy mentally, thanks to medication and therapy. And to even draw a silver lining to the grey cloud, I would say my experience with depression, mood and energy management, and therapy practices has helped me become a more well-rounded and grounded person, and even contributed to other life endeavours. \n\n For example, the way I study now is totally different, and better and more fitting for the way my mind works. My writing too has benefitted - I think of it like an expanded palette (sometimes you need the grey colours too).",
        btext: "",
        opts: [
          {
              text: "> it sounds like you've come a long way", id: 'brightside'
          },
          {
              text: "> ok let's get back to your application. development experience?", id: 'devexp'
          }
        ]
      },
      {
        id: 'dad',
        atext: "> Right, well I may have mentioned my difficulty finding time earlier. Sadly, my Dad was diagnosed with Alzheimer's a few years ago, and degraded rapidly, and I became his full time carer for a while. \n\n I've now devolved some of that duty from myself, and I'm motivated to make a better career for myself and put money towards my Dad's care going forward.",
        btext: "",
        opts: [
          {
              text: "> really sorry to hear that. I hope you and your family manage okay", id: 'brightside'
          }
        ]
      },
      {
        id: 'brightside',
        atext: "> I appreciate it. Look, I won't lie, things have been pretty difficult now and then, but I've pulled through, not on my own, but with the help of friends and family. And I'm proud to help them when they need it too. \n\n This application is part of that in a way, since I want to contribute better for others with my own development.",
        btext: "'It's quite the story,' your colleague says. 'But don't get distracted by it. Get back to the important stuff. What's their development experience?'",
        opts: [
          {
              text: "> What's your development experience?", id: 'devexp'
          }
        ]
      },
      {
        id: 'devexp',
        atext: "> I have been learning a little as a hobbyist the last couple of years. I worked through the 6.0001 Introduction to Computer Science and Programming in Python from MIT. \n\n The big advantage I have is that my academic career was in mathematics, so a lot of the mathematical and logical thinking that might be challenging to some is often quite familiar to me, and I also get a handle on new ideas quickly. I also tinkered with some HDL and Assembly for fun. \n\n Web development I really only got into while putting this together, while I've had the time in the past weeks.",
        btext: "",
        opts: [
          {
              text: "> you were a mathematician?", id: 'math'
          },
          {
              text: "> tell us why we should give you a spot", id: 'reasonto'
          },
          {
              text: "> is there anything else we missed?", id: 'reasonnot'
          }
        ]
      },
      {
        id: 'math',
        atext: "> Not just a mathematician, I was a logician. So very close to computer science, which I've realised more and more the deeper I get into studying programming. \n\n OK, I don't want to take up much more of your time. I can leave you with the best reason to take me on, or, if you want, a reason not to.",
        btext: "A reason not to? Intriguing.",
        opts: [
          {
              text: "> what's the reason not to?", id: 'reasonnot'
          },
          {
              text: "> give me a reason to take you on", id: 'reasonto'
          }
        ]
      },
      {
        id: 'reasonto',
        atext: "> I've had great success in the past few weeks while I've had the dedicated time to study and learn web development and some related programming topics. \n\n I think joining Founders and Coders promises to continue and amplify that progress. \n\n Additionally, I study very well as part of a cohort - I'm a sociable person and a socialble learner. I'd like to think I'd benefit myself from being on the course, but also benefit others as well.",
        btext: "Social learner. That does fit the program. \n\n 'So what do you think?' Your colleague looks at you expectantly. You stare back for a minute and shrug. She sighs, and gathers her things to leave. \n\n You stand by the shrug. No reason to rush the decision after all.",
        opts: [
          {
              text: "> any final thoughts?", id: 'last'
          }
        ]
      },
      {
        id: 'reasonnot',
        atext: "> Well, as I said, I'm 36, so I'm sure I'm older than most applicants. And I'm all for the education and upskilling of young enterprising people. So in that sense, I'd hate to take away the spot of some young person who could really benefit from the course and the community. \n\n The other, somewhat related reason is how much progress I've made in the past few weeks while I've had the time, and how much fun I've had studying programming and development. \n\n Which is to say, I think even if I don't taken on by you guys, I feel pretty confident about continuing my studies and hopefully turning it into a career down the line. I'm sure people would say I'm very stupid for giving reasons not to take me on the course, but I can't help but give them?",
        btext: "It's hard not to take him as honest, from these words. However, you think to yourself, he wrote your reaction with his words as well! He's controlling your very thoughts. \n\n Isn't this whole thing a little manipulative?",
        opts: [
          {
              text: "> ok and what's the reason to take you on?", id: 'reasonto'
          }
        ]
      },
      {
        id: 'last',
        atext: "If you didn't see already, I have linked below a page that provides an overview of everything I've said here, as well as a list of the resources I used in making this website and the game in my application. \n\n Regardless of the outcome, I'm very pleased to have had the opportunity and reason to push myself for the application deadline and devote time to studying and upskilling in web development and programming. \n\n I'm optimistic it will lead to good things, and, for reasons I may have mentioned already, I'm very motivated to make it work. From what I've seen of the Founders and Coders program, it's a very good thing you do, and so I'm grateful for your work. \n\n Best of luck to all the other applicants and to those taking the course going forward. \n\n And, of course, Happy New Year 2025!",
        btext: "You hear the sounds of people gathering outside, and some stray fireworks in the distance. Happy New Year indeed. \n\n It's hard to be sure what 2025 will bring, but somehow, you have a good feeling about it, a warmth in your chest, and a spring to your step. \n\n With a small smile you power of the terminal, and follow your colleague outside, towards the mingled scents of fire and wine and firework smoke.",
        opts: [
        ]
      },
  ]


startTree()