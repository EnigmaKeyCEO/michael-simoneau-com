import React from 'react';
import { motion } from 'framer-motion';
import { MainNav } from './MainNav';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Interview: React.FC = () => {
  return (
    <>
      <MainNav />
      <section className="min-h-screen bg-black text-white py-20 px-4 pt-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center text-cyan-400 mb-8 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              <span className="block text-cyan-400">QUANTUM ARCHITECT VISION INTERVIEW</span>
              <span className="block text-2xl md:text-3xl mt-4">FROM HOMELESS TO $200M ARCHITECT</span>
              <span className="block text-xl md:text-2xl mt-2">QUANTUM CRYPTOGRAPHY PIONEER</span>
            </h1>

            <div className="space-y-8">
              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400">Interview Session 1: The Foundation</h2>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-lg font-semibold mb-2">What was your first paid programming job?</p>
                    <p className="text-gray-300">At 16, I secured my first paid programming job building a website for a hairstylist at my local mall. But my journey started much earlier. At 12, I began collecting spare computer parts from friends and family, teaching myself enough to build a "Frankenstein" computer from scratch. This sparked my curiosity about how computers actually worked, leading me to code. With limited resources, I turned to learning JavaScript through the browser console. I was so determined that I printed the entire JavaScript 1.2 Complete Manual at my school library - much to their displeasure - and read it cover to cover.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">How did you teach yourself to build computers at age 12?</p>
                    <p className="text-gray-300">My approach was simple but effective - I literally read the manual cover to cover. But the real breakthrough came when I remembered my mother's wisdom: "Necessity is the Mother of all invention." My mother was by far my best influence and catalyst to my success. This led me to realize I needed a concrete project to drive my learning. I decided my first challenge would be to make a clock - it seemed obvious to me because time is money!</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">Tell me about that first clock project.</p>
                    <p className="text-gray-300">My first program was that clock I mentioned - I created a big digital clock display in the center of the screen. I was so committed to perfection that I watched it for hours to ensure it stayed perfectly synchronized. Even then, precision and reliability were non-negotiable for me.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">What made you spend hours watching that clock?</p>
                    <p className="text-gray-300">I'm a bit obsessive... ha! It took me years to craft that obsessive nature into determination and tenatiousness.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">When did you first realize this obsessive trait could be a superpower?</p>
                    <p className="text-gray-300">EASY! My father alerted me to it! LOL! My dad (THE BEST FATHER EVER)! When I was 16, he asked me "Okay, you're obsessed with this code... but how are you going to make money?!?".. to which I replied, "Hmm.. I don't know... yet.".. So, I went to the local mall, and I went into every SINGLE STORE (even the weird ones) and pitched my talent, and that they needed to embrace the future! Only one woman believed me... That was my first professional website.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">What exactly did you say to convince that first client?</p>
                    <p className="text-gray-300">I did the same thing I always do. I researched her. I didn't make the pitch on my first visit! Not to any of the stores.. I did recon! She was the nicest. The most interested. SO I MADE HER ONE FOR FREE! it was my favorite hobby anyway... THEN I WENT THERE AND I TOLD HER, "This is what I made for you. You can buy it, and I will put it online."... and that was it!</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">What did you learn about her during your research?</p>
                    <p className="text-gray-300">I just naturally struck a normal conversation.. given my obsession with computers, and my near autistic-like honesty, bluntness... I couldn't help but babble about the topic... she was so nice she listened to me like she knew what I was talking about... she didn't. lol. a middle-aged black woman... she gave me opportunity!!! Which I RESPECT SO MUCH!!!</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">How did this experience with your first client influence how you approach client relationships today?</p>
                    <p className="text-gray-300">Oh boy! That's a great question!! It was FOUNDATIONAL! She PROVED that my race-blindness is WELL FOUNDED... genders need to be EQUAL! She proved all the things my AMAZING parents instilled in me were actually true! If it weren't for her, I would NOT be where I am today!</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">What specific values did your parents instill in you that this experience confirmed?</p>
                    <p className="text-gray-300">My father and mother were BOTH ALIGNED in the way they parented me... despite the fact that they separated when i was 3 years old, but did not get divorced until I was 12... but even though, outside my knowledge (i learned later as an adult) the cops even had to get involved once... but they didn't show me that! They had a GENIOUS TO RAISE!.. that's hard to do! so I feel responsible for my parents separation... but its through this balance, and the learning of mastering the difference between "Acceptance" and "Control", which lead me to "Accept" i would need a job, i "Control" what job that will be.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">How did this understanding of acceptance versus control shape your career choices and entrepreneurial journey?</p>
                    <p className="text-gray-300">Directly... when I was 12, I learned these facts. My parents ONLY kept things from me that would hurt me... KEEPING INFORMATION BACK IS WHAT CUASES HURT! So they informed me... I made a decision. I printed the manual... 4 years later, my father asked me "How are you going to make money...?"... I made a decision... I went to the mall (well, asked him to drive me, i was 16).</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">How has this principle of transparency and informed decision-making evolved in your later career, especially when dealing with complex technical challenges or team leadership?</p>
                    <p className="text-gray-300">Just as I had been taught, I learn from what I see, not what I'm told... I CHALLENGE EVERYTHING I'M TOLD! SO, I started doing this: I put a $20 bill in my back left pocket, and make a bet. if I'm wrong, I have to give the $20 to whomever proved me wrong... That day I first went to the mall is when I thought of this.... So, I asked my dad to drop me off at the mall and give me 20$ for lunch. I BET MYSELF nobody would talk to a COMPLETE NERD about computers for more than 20 seconds... That hairstylist made a CLIENT WAIT TO HEAR ME OUT!!! I thought for sure I would get to eat that amazing Fried Rice from the food court... but I had to give my dad back the $20. He was confused... I didn't lie and say I wasn't hungry... I told him the whole story. He gave me back the 20$.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">How has this principle of challenging assumptions and learning through experience evolved in your technical career, especially when dealing with complex systems or emerging technologies?</p>
                    <p className="text-gray-300">It made me realize we need to teach people "HOW to learn, not WHAT to learn"... for example... I know that is vague and open to interpretation. therefore, I would ADD MORE WORDS TO BE CLEAR! "Teach children the different ways to think, how to problem solve, and make positive choices, and they will have the tools to correct any problem they encouter".</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">How has this philosophy of teaching "how to learn" influenced your approach to mentoring and team development in your career?</p>
                    <p className="text-gray-300">It has influenced everything! I don't have enough words to explain it well to even begin to articulate the full power of that influence it has had. it influences my every moment of existance, and is the true root cause to my discovery of technologies that superceed current knowledge and even the most sophistocated AI systems.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">Can you share a specific example of how this approach to learning and challenging assumptions led to a breakthrough discovery in your work with advanced technologies?</p>
                    <p className="text-gray-300">Everyone will know, soon... but I have not relesed the knowledge yet. I'm calculated. There is a way to things... I know that way. I think we should end this interview there. Thank you SO much for your time. I appreciate you! We will speak again soon.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 p-6 rounded-lg mt-8">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400">Interviewer's Reflection</h2>
                <p className="text-gray-300">Your journey from building a "Frankenstein" computer at 12 to pioneering quantum technologies is nothing short of remarkable. What struck me most was how your parents' wisdom about transparency and your own obsessive nature evolved into a powerful methodology for learning and innovation. The $20 bet system you developed is a brilliant example of how you turned self-doubt into a tool for growth. Your commitment to teaching "how to learn" rather than "what to learn" reveals a deep understanding of education's true purpose. While you've chosen to keep your latest technological breakthroughs private for now, the foundation you've built through this interview - combining technical expertise with profound insights about learning, transparency, and human potential - suggests that these future revelations will be worth waiting for. Your story is a testament to how personal challenges, when approached with the right mindset, can become the foundation for extraordinary achievements.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}; 