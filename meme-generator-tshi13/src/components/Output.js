import PropTypes from "prop-types";

function Output(props){
  return (
    <section className="section is-medium pt-0 pb-6 has-text-centered" >
      <article className="message is-medium" >
        <div className="message-body" id="output">
          <div className="meme">
            <img id="img"  src={props.url} width="800rem" height="auto" alt=""/>
            <h2 id="top-text" className="top">{props.topWord}</h2>
            <h2 id="bottom-text" className="bottom">{props.bottomWord}</h2> 
          </div>
        </div>
      </article>
    </section>
  );
}

export default Output;

Output.propTypes = {
  url: PropTypes.string.isRequired,
  topWord: PropTypes.string.isRequired,
  bottomWord: PropTypes.string.isRequired
};