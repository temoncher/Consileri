import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  @ViewChild('numberSlider') numberSlider: ElementRef;
  @ViewChild('playerSlider') playerSlider: ElementRef;

  players = [
    {
      number: 1,
      name: 'Cabby',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 2,
      name: 'Fiora',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 3,
      name: 'Temoncher',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 4,
      name: 'Olezha',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 5,
      name: 'Bulcohka',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 6,
      name: 'Ezhik',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 7,
      name: 'Maffin',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 8,
      name: 'Vorobushek',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 9,
      name: 'Aut',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    {
      number: 10,
      name: 'Kasper',
      proposedPlayers: [],
      quitPhase: null,
      imageURL: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    }
  ];

  currentPhase = 0;

  timers = [];

  firstSliderConfig = {
    slidesPerView: 5.5
  };

  secondSliderConfig = {
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: 1.6
  };

  constructor() { }

  ngOnInit() {
    let count = 0;
    this.players.forEach(() => {
      this.timers[count] = { time: 0, paused: true, timer: null, ended: false };
      count++;
    });
  }

  navigateToSlide(index) {
    this.playerSlider.slideTo(index);
  }

  endSpeech(index) {
    if (!this.players[index - 1].proposedPlayers[this.currentPhase]) {
      this.players[index - 1].proposedPlayers.push(0);
    }
    this.playerSlider.slideTo(index);
    if (!this.timers[index - 1].paused) {
      this.switchTimer(index);
    }
    this.timers[index - 1].ended = true;
  }

  proposePlayer(index) {
    this.players[index - 1].proposedPlayers.push(5);
  }

  switchTimer(index) {
    // tslint:disable-next-line: prefer-const
    let currentTimer = this.timers[index - 1];
    if (!currentTimer.ended && currentTimer.time <= 59) {
      if (currentTimer.paused) {
        currentTimer.timer = setInterval(() => {
          if (currentTimer.time === 59) {
            clearInterval(currentTimer.timer);
          }
          currentTimer.time++;
        }, 1000);
        currentTimer.paused = false;
      } else {
        clearInterval(currentTimer.timer);
        currentTimer.paused = true;
      }
    }
  }

  logInfo() {
    console.log(this.players);
  }
}
