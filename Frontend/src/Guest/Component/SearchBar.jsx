import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function SearchBar() {
    return (
        <div className="container " >
            <InputGroup size="default" >
                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder='Search your preferred items here'
                />
                <InputGroup.Text>
                    <Link to={'/login'}>
                        <button className='bg-light' style={{ border: 'none' }}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} color='#dc3545' className='fs-3' />
                        </button>
                    </Link>
                </InputGroup.Text>
            </InputGroup>
        </div>
    )
}
