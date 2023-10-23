import "./css/messenger.css";

const Messenger = () => {
  return (
    <div className="body">

    <div class="container">
      <div class="row">
        <nav class="menu">
          <ul class="items">
            <li class="item">
              <i class="fa fa-home" aria-hidden="true"></i>
            </li>
            <li class="item">
              <i class="fa fa-user" aria-hidden="true"></i>
            </li>
            <li class="item">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </li>
            <li class="item item-active">
              <i class="fa fa-commenting" aria-hidden="true"></i>
            </li>
            <li class="item">
              <i class="fa fa-file" aria-hidden="true"></i>
            </li>
            <li class="item">
              <i class="fa fa-cog" aria-hidden="true"></i>
            </li>
          </ul>
        </nav>

        <section class="discussions">
          <div class="discussion search">
            <div class="searchbar">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search..."></input>
            </div>
          </div>
          <div class="discussion message-active">
            <div class="photo">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">Megan Leib</p>
              <p class="message">9 pm at the bar if possible 😳</p>
            </div>
            <div class="timer">12 sec</div>
          </div>

          <div class="discussion">
            <div class="photo">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">Dave Corlew</p>
              <p class="message">
                Let's meet for a coffee or something today ?
              </p>
            </div>
            <div class="timer">3 min</div>
          </div>

          <div class="discussion">
            <div class="photo"></div>
            <div class="desc-contact">
              <p class="name">Jerome Seiber</p>
              <p class="message">I've sent you the annual report</p>
            </div>
            <div class="timer">42 min</div>
          </div>

          <div class="discussion">
            <div class="photo">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">Thomas Dbtn</p>
              <p class="message">See you tomorrow ! 🙂</p>
            </div>
            <div class="timer">2 hour</div>
          </div>

          <div class="discussion">
            <div class="photo"></div>
            <div class="desc-contact">
              <p class="name">Elsie Amador</p>
              <p class="message">What the f**k is going on ?</p>
            </div>
            <div class="timer">1 day</div>
          </div>

          <div class="discussion">
            <div class="photo"></div>
            <div class="desc-contact">
              <p class="name">Billy Southard</p>
              <p class="message">Ahahah 😂</p>
            </div>
            <div class="timer">4 days</div>
          </div>

          <div class="discussion">
            <div class="photo">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">Paul Walker</p>
              <p class="message">You can't see me</p>
            </div>
            <div class="timer">1 week</div>
          </div>
        </section>
        <section class="chat">
          <div class="header-chat">
            <i class="icon fa fa-user-o" aria-hidden="true"></i>
            <p class="name">Megan Leib</p>
            <i
              class="icon clickable fa fa-ellipsis-h right"
              aria-hidden="true"
            ></i>
          </div>
          <div class="messages-chat">
            <div class="message">
              <div class="photo">
                <div class="online"></div>
              </div>
              <p class="text"> Hi, how are you ? </p>
            </div>
            <div class="message text-only">
              <p class="text">
                {" "}
                What are you doing tonight ? Want to go take a drink ?
              </p>
            </div>
            <p class="time"> 14h58</p>
            <div class="message text-only">
              <div class="response">
                <p class="text"> Hey Megan ! It's been a while 😃</p>
              </div>
            </div>
            <div class="message text-only">
              <div class="response">
                <p class="text"> When can we meet ?</p>
              </div>
            </div>
            <p class="response-time time"> 15h04</p>
            <div class="message">
              <div class="photo">
                <div class="online"></div>
              </div>
              <p class="text"> 9 pm at the bar if possible 😳</p>
            </div>
            <p class="time"> 15h09</p>
          </div>
          <div class="footer-chat">
            <i class="icon fa fa-smile-o clickable" aria-hidden="true"></i>
            <input
              type="text"
              class="write-message"
              placeholder="Type your message here"
            ></input>
            <i
              class="icon send fa fa-paper-plane-o clickable"
              aria-hidden="true"
            ></i>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Messenger;
