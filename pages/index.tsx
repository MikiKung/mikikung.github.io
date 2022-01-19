import Head from 'next/head'
import classes from './index.module.scss'
import Navbar from '@/components/navbar'
import Animation from '@/components/animation/index'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import emailjs from '@emailjs/browser'

//paralaxx animation
export default function Home() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const loadingRef = useRef<boolean>(false)
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (loadingRef.current) return

    loadingRef.current = true
    setLoading(true)

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
      {
        from_name: name,
        from_email: email,
        message: message,
      },
      process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID!,
    )

    window.alert('send email success')
    setName('')
    setEmail('')
    setMessage('')
    loadingRef.current = false
    setLoading(false)
  }

  library.add(fab, fas)
  const [ScrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      //window.scrolly เอาไว้เช็คตำเเหน่งที่ scroll เเนวตั้ง
      setScrollY(window.scrollY)
    }
    //เช็ค scroll ในครั้งเเรกที่หน้าเว็ปถูกโหลดขึ้นมา(didmounth)
    handleScroll()

    //set ค่าใน handleScroll ระหว่างที่ scroll mouse อยู่
    window.addEventListener('scroll', handleScroll)

    //set ค่าใน handleScroll ตอนที่ scroll mouse หยุด
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //เอาค่าตัวเลขของ scroll มาคำนวณเพื่อลดขนาดของ css <ตรงนี้อิงตาม width>
  const setSizeImg = useMemo(() => {
    // clamp คือฟังชั้นที่เอาไว้คำนวณเพื่อนำค่าที่ได้ไปเก็บใน ScrollY <getter setter ที่สร้างมา>
    return clamp(300 - ScrollY / 2, 300, 250)
  }, [ScrollY])

  function clamp(size: number, max: number, min: number) {
    return size <= min ? min : size >= max ? max : size
  }

  return (
    <div>
      <Head>
        <title>Peeranut Moonrut</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/profile.svg" />
      </Head>

      <main>
        <Navbar />
        <div className={classes.main}>
          <Animation />
        </div>
        <div className={classes.recommand} id="Recommend">
          <img
            src="./profile.svg"
            alt="test"
            style={{ width: setSizeImg, zIndex: 1 }}
          />
          <p className={classes.hello}>Hi!, my name is Peeranut Moonrut.</p>
          <p className={classes.bio}>
            I'm want practic everything if I can. I'm frontend developer. I'm
            learning in backend developer
          </p>
        </div>
        <div className={classes.skill} id="Skill">
          <span className={classes.textSkill}>
            Skill
            <p className={classes.textSkillInfo}>
              * I'm have beginner experience
            </p>
          </span>
          <p className={classes.headSkill}>Programming Languages</p>
          <div className={classes.infoSkill}>
            <span className={classes.allIcon}>
              <FontAwesomeIcon
                className={classes.icon}
                icon={['fab', 'js-square']}
              />
              <p className={classes.textIcon}>Javascript</p>
            </span>
            <span className={classes.allIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={classes.icon}
              >
                <path d="M3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5c0-1.105-0.895-2-2-2H5C3.895,3,3,3.895,3,5z M13.666,12.451h-2.118	V19H9.841v-6.549H7.767V11h5.899V12.451z M13.998,18.626v-1.751c0,0,0.956,0.721,2.104,0.721c1.148,0,1.103-0.75,1.103-0.853	c0-1.089-3.251-1.089-3.251-3.501c0-3.281,4.737-1.986,4.737-1.986l-0.059,1.559c0,0-0.794-0.53-1.692-0.53	c-0.897,0-1.221,0.427-1.221,0.883c0,1.177,3.281,1.059,3.281,3.428C19,20.244,13.998,18.626,13.998,18.626z" />
              </svg>
              <p className={classes.textIcon}>Typescript</p>
            </span>
          </div>
          <p className={classes.headSkill}>Frontend-Framework</p>
          <div className={classes.infoSkill}>
            <span className={classes.allIcon}>
              <svg
                className={classes.icon}
                viewBox=".5 -.2 1023 1024.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" />
                <path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" />
              </svg>
              <p className={classes.textIcon}>Next js</p>
            </span>
            <span className={classes.allIcon}>
              <FontAwesomeIcon
                className={classes.icon}
                icon={['fab', 'vuejs']}
              />
              <p className={classes.textIcon}>Vue js</p>
            </span>
            <span className={classes.allIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
              >
                <path d="M26.707 3.293l-21 21c-.391.391-.391 1.024 0 1.414l5.586 5.586c.391.391 1.024.391 1.414 0L39.293 4.707C39.923 4.077 39.477 3 38.586 3H27.414C27.149 3 26.895 3.105 26.707 3.293zM39.293 24.707L22 42l-6.293-6.293c-.391-.391-.391-1.024 0-1.414l11-11C26.895 23.105 27.149 23 27.414 23h11.172C39.477 23 39.923 24.077 39.293 24.707zM39.293 45.293L32 38l-10 4 4.707 4.707C26.895 46.895 27.149 47 27.414 47h11.172C39.477 47 39.923 45.923 39.293 45.293z" />
              </svg>

              <p className={classes.textIcon}>Flutter</p>
            </span>
          </div>
          <p className={classes.headSkill}>Backend-Framework</p>
          <div className={classes.infoSkill}>
            <span className={classes.allIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 67 40"
              >
                <use xlinkHref="#A" x="1" y="1" />
                <symbol id="A" overflow="visible">
                  <path d="M64 36.167c-2.328.592-3.768.026-5.06-1.914l-9.188-12.712-1.328-1.76-10.73 14.514c-1.226 1.746-2.512 2.506-4.8 1.888l13.74-18.444-12.792-16.66c2.2-.428 3.72-.21 5.07 1.76l9.53 12.87 9.6-12.8c1.23-1.746 2.552-2.41 4.76-1.766l-4.96 6.576-6.72 8.75c-.8 1-.69 1.684.046 2.65L64 36.167zM.016 17.431l1.124-5.528C4.2.963 16.74-3.583 25.388 3.177c5.054 3.976 6.31 9.6 6.06 15.9H2.96c-.428 11.34 7.734 18.184 18.14 14.692 3.65-1.226 5.8-4.084 6.876-7.66.546-1.792 1.45-2.072 3.134-1.56-.86 4.472-2.8 8.208-6.9 10.546-6.126 3.5-14.87 2.368-19.47-2.496C2 29.777.868 26.201.36 22.377c-.08-.632-.24-1.234-.36-1.84q.016-1.552.016-3.104zm2.996-.76h25.744c-.168-8.2-5.274-14.024-12.252-14.074-7.66-.06-13.16 5.626-13.492 14.074z" />
                </symbol>
              </svg>
              <p className={classes.textIcon}>Express js</p>
            </span>
            <span className={classes.allIcon}>
              <FontAwesomeIcon
                className={classes.icon}
                icon={['fab', 'node']}
              />
              <p className={classes.textIcon}>Node js</p>
            </span>
          </div>
          <div className={classes.project} id="Project">
            <p className={classes.textSkill}>Project</p>
            <div className={classes.allProject}>
              <Link href="https://github.com/MikiKung/Horoscope-flutter">
                <a className={classes.oneProject}>
                  <div className={classes.allInfoProject}>
                    <p className={classes.projectName}>Horoscope application</p>
                    <p className={classes.projectBio}>
                      you can horoscope with taro card 53 card and can watch
                      history card in your Horoscope.
                    </p>
                    <div className={classes.allType}>
                      <FontAwesomeIcon
                        className={classes.circleTypeFlutter}
                        icon={['fas', 'circle']}
                      />
                      <p className={classes.textType}>flutter</p>
                    </div>
                    <span className={classes.projectIcon}>
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                  </div>
                </a>
              </Link>

              <Link href="https://github.com/MikiKung/bot">
                <a className={classes.oneProject}>
                  <div className={classes.allInfoProject}>
                    <p className={classes.projectName}>school life website</p>
                    <p className={classes.projectBio}>
                      website for discord bot name school life. build for tell
                      command bot and invite bot. (deployed)
                    </p>
                    <div className={classes.allType}>
                      <FontAwesomeIcon
                        className={classes.circleTypeNextjs}
                        icon={['fas', 'circle']}
                      />
                      <p className={classes.textType}>next js</p>
                    </div>
                    <span className={classes.projectIcon}>
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                  </div>
                </a>
              </Link>

              <Link href="https://github.com/MikiKung/LearnScheduleBotDiscord">
                <a className={classes.oneProject}>
                  <div className={classes.allInfoProject}>
                    <p className={classes.projectName}>
                      bot discord tell learning schedule
                    </p>
                    <p className={classes.projectBio}>
                      bot discord for tell learning schedule. have 5 command for
                      use it. use in software engineering UP 64/2. (deployed)
                    </p>
                    <div className={classes.allType}>
                      <FontAwesomeIcon
                        className={classes.circleTypeJavascript}
                        icon={['fas', 'circle']}
                      />
                      <p className={classes.textType}>javascript</p>
                    </div>
                    <span className={classes.projectIcon}>
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                  </div>
                </a>
              </Link>

              <Link href="https://gitlab.com/se-myteam/se-myteam-project">
                <a className={classes.oneProject}>
                  <div className={classes.allInfoProject}>
                    <p className={classes.projectName}>website for cafe</p>
                    <p className={classes.projectBio}>
                      website for cafe. users can buying order and owner can
                      accept or ignore order but this website does't have
                      payment methode
                    </p>
                    <div className={classes.allType}>
                      <FontAwesomeIcon
                        className={classes.circleTypeNextjs}
                        icon={['fas', 'circle']}
                      />
                      <p className={classes.textType}>next js</p>
                      <p className="p-2"></p>
                      <FontAwesomeIcon
                        className={classes.circleTypeJavascript}
                        icon={['fas', 'circle']}
                      />
                      <p className={classes.textType}>express</p>
                    </div>
                    <span className={classes.projectIcon}>
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className={classes.experience} id="Experience">
            <p className={classes.textSkill}>Experience</p>
            <div className={classes.allEx}>
              <div className={classes.oneEx}>
                <p className={classes.headTextEx}>Tournaments & Activities</p>
                <div className={classes.activityEx}>
                  <p className={classes.nameEx}>
                    Startup Thailand League 2020 (Evoligence)
                  </p>
                  <p className={classes.bioEx}>
                    a platform to teach children in Executive Functions. qualify
                    to go demo day in bangkok.
                  </p>
                  <div className={classes.allImgEx}>
                    <img className={classes.imgEx} src="./stl3.jpg" />
                    <img className={classes.imgEx} src="./stl2.jpg" />
                    <img className={classes.imgEx} src="./stl1.jpg" />
                  </div>
                </div>

                <div className={classes.activityEx}>
                  <p className={classes.nameEx}>
                    Research to Market 2020 (Evoligence)
                  </p>
                  <p className={classes.bioEx}>
                    a platform to teach children in Executive Functions.
                  </p>
                  <div className={classes.allImgEx}>
                    <img className={classes.imgEx} src="./r2m1.jpg" />
                    {/* <img className={classes.imgEx} src="./r2m2.jpg" /> */}
                    <img className={classes.imgEx} src="./r2m3.jpg" />
                  </div>
                </div>

                <div className={classes.activityEx}>
                  <p className={classes.nameEx}>other</p>
                  <p className={classes.bioEx}>
                    I'm is recreation ICT since 2019.
                  </p>
                  <p className={classes.bioEx}>
                    I'm is SMO ICT (Student Leader in ICT) since 2019.
                  </p>
                  <p className={classes.bioEx}>
                    I'm is waing leader (Student Leader in wiang university of
                    phayao) since 2019.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.contact} id="Contact">
            <p className={classes.textSkill}>Contact</p>
            <form onSubmit={handleSubmit} className={classes.outContact}>
              <div className={classes.allContact}>
                <p className={classes.textContact}>Name</p>
                <input
                  className={classes.contactInp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                />
                <p className={classes.textContact}>Email</p>
                <input
                  className={classes.contactInp}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
                <p className={classes.textContact}>Message</p>
                {/* <input  type="text" /> */}
                <textarea
                  className={classes.contactInp2}
                  name="messsage"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="masssage"
                ></textarea>
                <button type="submit" className={classes.Btn}>
                  <span className={classes.BtnInp}>
                    {loading?<img src="./load.svg" alt="load" style={{height:20}} className='mr-3 animate-spin' />:<p></p>}
                    <p> submit </p>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
