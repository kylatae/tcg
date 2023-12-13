import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

export default function RulesPage() {

    return (
        <>
            <h1>Game Rules & FAQ</h1>

            <img src="img/scapePic.jpg" alt="tree with sun" width="90%" height="80%" />

            <div>
                <h2>Game Rules:</h2>
                <h3>Card Types:</h3>
            </div>

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block "
                        src={`./img/card/00001.png`}
                        alt="First slide"
                    />
                    <div>
                    <Carousel.Caption>
                        <h5>Hero Card</h5>
                        <p className="caroP">1 per deck. This card has 1 special passive and 1 single time use skill per game. It also has a base health pool. When eliminated this player loses the game. It is displayed face up at the start of the game outside the board.
                        </p>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block "
                        src={`./img/card/00209.png`}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5>Spell Card</h5>
                        <p className="caroP">Each player gets 5 spell cards played face down next to their hero card at the start of the game. Players may view their own spells at any time, and upon their first use they are turned face up for the remainder of the game. These cards use mana, are reusable, and do not change during the game.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block "
                        src={`./img/card/00152.png`}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>Summon Card</h5>
                        <p className="caroP">
                            Summon cards are placed directly on the board face-up. They have a level, health, and attack value. They also have directional arrows on each of the 4 corners and sides (8-Way Directional) showing the directions they can attack. A summon may also possess one ability. When placed on the board a summon will attack, and at the start of the owners turn, are healed back to full health. On death a summon goes to the discard pile.

                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block "
                        src={`./img/card/00178.png`}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>Trap Card</h5>
                        <p className="caroP">
                            Trap cards are placed on the board face down. They are activated when ANY player hits them with a directional attack from a summoned creature. Once attacked the trap card is turned face up, its effect is used, and it is moved to the discard pile.

                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="cardBox">
            <Card border="primary" className="phaseCards">
                <Card.Header>Mana Phase</Card.Header>
                <Card.Body>
                    <Card.Text>
                        At the start of every turn Mana gain is calculated. For every space on the board that the player controls they receive 1 Mana. There is no cap for mana and it can be stored for future rounds.

                    </Card.Text>
                </Card.Body>
            </Card>
            <br />

            <Card border="light" className="phaseCards">
                <Card.Header>Draw Phase</Card.Header>
                <Card.Body>

                    <Card.Text>



                        A player will draw 1 card at the start of their turn.

                    </Card.Text>
                </Card.Body>
            </Card>
            <br />



            <Card border="light" className="phaseCards">
                <Card.Header>Sacrifice Phase</Card.Header>
                <Card.Body>

                    <Card.Text>



                        A player may choose to sacrifice up to 1 creature they control on the board to acquire its souls without losing life.

                    </Card.Text>
                </Card.Body>
            </Card>
            <br />

            <Card border="light" className="phaseCards">
                <Card.Header>Summoner Phase</Card.Header>
                <Card.Body>

                    <Card.Text>



                        Each player has a chance to use their Summoner’s active skill (one time use all game) during this phase, or they can choose to go to their next phase.

                    </Card.Text>
                </Card.Body>
            </Card>
            <br />

            <Card border="light" className="phaseCards">
                <Card.Header>Spell Phase</Card.Header>
                <Card.Body>

                    <Card.Text>



                        A Spell may be cast at this time. If a spell is cast the player must possess the required amount of mana to do so. The Spell Phase is interchangeable with the Summon/Trap Phase.

                    </Card.Text>
                </Card.Body>
            </Card>
            <br />



            <Card border="light" className="phaseCards">
                <Card.Header>Summon/Trap Phase</Card.Header>
                <Card.Body>

                    <Card.Text>



                        A Summon or Trap Card may be placed onto the board on an empty space at this time. Upon placing a Summon down an attack phase begins. If a Trap is placed this phase is over.

                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card border="light" className="phaseCards">
                <Card.Header>Attack Phase</Card.Header>
                <Card.Body>

                    <Card.Text>






                        The newly summoned card attacks in all possible directions based on their directional values. All empty spaces in a line are considered the attackers (for mana calculations during Mana Phase). If an enemy card is in the line the attacker gets the first chance to eliminate that enemy unless otherwise stated. If the attacker fails, the defender may have an attack calculation in retaliation. Failure also results in not taking any spaces past the defender, nor the space the defender is on. Retaliation can result in the death of the attacker’s summon, however

                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Card border="danger" className="phaseCards">
                <Card.Header>Soul Phase</Card.Header>
                <Card.Body>

                    <Card.Text>






                        At the end of a turn a player gets souls equal to the level of the creature sacrificed. Furthermore if either player had any creatures slain during an attack phase (or spell) the summoner of that creature gets their souls back, and also takes 1 point of damage per level of the creature.


                    </Card.Text>
                </Card.Body>
            </Card>
            </div>





            <h2> FAQ: </h2>

            <ul>

                <li>
                    <b> what is?</b>
                    <i> a tactical grid based card game </i>
                </li>
                <li>
                    <b> is Gary a martian?</b>
                    <i> idk, probably </i>
                </li>
                <li>
                    <b> is Dizzy a dog?</b>
                    <i> decended from wolves </i>
                </li>
            </ul>

        </>
    );
}