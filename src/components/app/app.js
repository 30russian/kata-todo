import TaskList from '../task-list';
import Footer from '../footer';
import NewTaskForm from '../new-task-form';

const App = (props) => {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList {...props} />
        <Footer />
      </section>
    </section>
  );
};

export default App;