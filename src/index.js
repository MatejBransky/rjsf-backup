import Form from "./components/Form";
import fields from "./components/fields";
import widgets from "./components/widgets";
import templates from "./components/templates";
import initWithTheme from "./components/withTheme";

const withTheme = initWithTheme(Form, fields);

export { withTheme, Form, fields, widgets, templates };
export default withTheme("Bootstrap", { widgets, templates });
