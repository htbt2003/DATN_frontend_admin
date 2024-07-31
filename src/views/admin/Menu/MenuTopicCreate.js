import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuServices from '../../../services/MenuServices';
import TopicServices from '../../../services/TopicServices';

function MenuTopicCreate(prop) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topics, settopics] = useState([]);
  const navigator = useNavigate();
  useEffect(function () {
    (async function () {
      const result = await TopicServices.getAll();
      settopics(result.topicsAll);
    })();
  }, []);

  const handleCheckboxChange = (topicId) => {
    const isSelected = selectedTopics.includes(topicId);
    if (isSelected) {
      setSelectedTopics(prevSelected => prevSelected.filter(id => id !== topicId));
    } else {
      setSelectedTopics(prevSelected => [...prevSelected, topicId]);
    }
  };

  function MenuTopicStore(event) {
    event.preventDefault();//không load lại trang
    const menu = {
      position: prop.position,
      listid: selectedTopics,
      type: "chu-de-bai-viet"
    }
    MenuServices.tao(menu)

      .then((result) => {
        alert(result.message);
        navigator('/admin/menu', { replace: true });
      })
  }

  return (
    <form method='post' onSubmit={MenuTopicStore}>
      <div className="bg-white p-5 rounded">
        <div>
          {topics && topics.length > 0 && topics.map(function (topic, index) {
            return (
              <div className="form-check flex items-center gap-3 mb-2" key={index}>
                <input
                  className="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
            justify-center rounded-md border border-gray-500 text-white/0 outline-none transition duration-[0.2s]
            checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 checked:bg-brand-500 dark:checked:bg-brand-400"
                  type="checkbox"
                  defaultValue=""
                  id={"topic" + topic.id}
                  onChange={() => handleCheckboxChange(topic.id)}
                  checked={selectedTopics.includes(topic.id)}

                />
                <label className="form-check-label" htmlFor={"topic" + topic.id}>
                  {topic.name}
                </label>
              </div>
            );
          })}
        </div>
        <hr className='my-3'></hr>
        <div className="text-center px-2 py-2">
          <button type="submit" className="linear rounded bg-green-700 px-2 py-2 text-base text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            <i className="fa fa-save" aria-hidden="true" /> Tạo meu
          </button>
        </div>
      </div>

    </form>
  );
}

export default MenuTopicCreate;