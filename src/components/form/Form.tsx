import Button from '../button/Button';
import './form.scss';

const Form = () => {
    return(
        <section className='form'>
            <label className='form-subtitles'>Card number</label>
            <input type='text' className='input'/>

            <label className='form-subtitles'>Cardholder name</label>
            <input type='text' placeholder='FIRSTNAME LASTNAME' className='input'/>

            <article className='valid-ccv'>
                <div className='form-subtitles'>
                    <label>Valid thru</label><br></br>
                    <input type='text' className='input'/>
                </div>
                <div className='form-subtitles'>
                    <label>CCV</label><br></br>
                    <input type='text' className='input' />
                </div>
            </article>

            <label className='form-subtitles'>Vendor</label>
            <select className='input select-element'>
                <option value="bitcon-inc">Bitcon inc</option>
                <option value="ninja-bank">Ninja bank</option>
                <option value="block-chain-in">Block chain in</option>
                <option value="evil-corp">Evil corp</option>
            </select>

            <div className='padding'>
                <Button title={'Add card'} filled={true} />
            </div>

        </section>
    )
}

export default Form;