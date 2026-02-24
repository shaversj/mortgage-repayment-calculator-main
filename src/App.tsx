import { useRef, useState } from "react";
import { Title, Text, Flex, Image, Box, TextInput, ThemeIcon, Fieldset, Radio, Button } from "@mantine/core";
import { theme } from "./theme/theme.ts";
import "./App.css";
import "@mantine/core/styles.css";

import illustrion from "./assets/images/illustration-empty.svg";
import calculator from "./assets/images/icon-calculator.svg";
import { PiCurrencyGbpBold } from "react-icons/pi";

import { MantineProvider } from "@mantine/core";

function App() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [mortgageType, setMortgageType] = useState<"repayment" | "interest-only">("repayment");

  const calculatorIcon = <Image src={calculator} alt="Calculate Icon" h={24} w={24} />;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (timeoutRef.current !== -1) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setLoading(true);
      // Simulate an API call
      setTimeout(() => {
        setData([newValue]); // Replace with actual data from API
        setLoading(false);
      }, 1000);
    }, 500);
  };

  const themedPi = (
    <ThemeIcon
      color={theme.colors?.slate?.[1]}
      w={60}
      h={48}
      style={{
        border: `1px solid ${theme.colors?.slate?.[5]}`,
        borderTopLeftRadius: "4px",
        borderBottomLeftRadius: "4px",
        borderLeft: "none",
      }}
      radius={0}
    >
      <PiCurrencyGbpBold size={16} color={theme.colors?.slate?.[5]}></PiCurrencyGbpBold>
    </ThemeIcon>
  );
  return (
    <MantineProvider theme={theme}>
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <Box w={540} h={606} py="xl" p={40}>
          <Flex align="center" justify="space-between">
            <Title size="h2">Mortgage Calculator</Title>
            <Box ml="auto">
              <Text size="xs" td="underline">
                Clear All
              </Text>
            </Box>
          </Flex>

          <form style={{ paddingTop: "40px" }}>
            <TextInput
              styles={{
                input: { paddingLeft: "56px", fontSize: "18px", fontWeight: 700, lineHeight: "125%", borderRadius: "4px", height: 48, border: `1px solid ${theme.colors?.slate?.[5]}` },
              }}
              leftSectionPointerEvents="none"
              leftSection={themedPi}
              leftSectionWidth="40px"
              label="Mortgage Amount"
              labelProps={{
                style: { paddingBottom: "12px", color: theme.colors?.slate?.[7], fontSize: "16px", fontWeight: 500, lineHeight: "150%" },
              }}
              value={value}
              onChange={handleChange}
            />

            <Flex style={{ paddingTop: "24px" }} gap={24}>
              <TextInput
                styles={{
                  input: {
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "125%",
                    borderRadius: "4px",
                    height: 48,
                    border: `1px solid ${theme.colors?.slate?.[5]}`,
                  },
                }}
                rightSectionPointerEvents="none"
                rightSectionWidth={80}
                rightSection={
                  <Text
                    h={48}
                    w={80}
                    c={theme.colors?.slate?.[5]}
                    style={{
                      paddingRight: "16x",
                      paddingLeft: "16px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      backgroundColor: theme.colors?.slate?.[1],
                      border: `1px solid ${theme.colors?.slate?.[5]}`,
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                      borderLeft: "none",
                      borderRight: "none",
                      fontSize: "18px",
                      fontWeight: 700,
                      letterSpacing: "-1px",
                      lineHeight: "125%",
                    }}
                  >
                    years
                  </Text>
                }
                label="Mortgage Term"
                labelProps={{
                  style: { paddingBottom: "12px", color: theme.colors?.slate?.[7], fontSize: "16px", fontWeight: 500, lineHeight: "150%" },
                }}
              />

              <TextInput
                styles={{
                  input: {
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "125%",
                    borderRadius: "4px",
                    height: 48,
                    border: `1px solid ${theme.colors?.slate?.[5]}`,
                  },
                }}
                rightSectionPointerEvents="none"
                rightSectionWidth={51}
                rightSection={
                  <Text
                    h={48}
                    w={51}
                    c={theme.colors?.slate?.[5]}
                    style={{
                      paddingRight: "16x",
                      paddingLeft: "16px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      backgroundColor: theme.colors?.slate?.[1],
                      border: `1px solid ${theme.colors?.slate?.[5]}`,
                      borderTopRightRadius: "4px",
                      borderBottomRightRadius: "4px",
                      borderLeft: "none",
                      borderRight: "none",
                      fontSize: "18px",
                      fontWeight: 700,
                      letterSpacing: "-1px",
                      lineHeight: "125%",
                    }}
                  >
                    %
                  </Text>
                }
                label="Interest Rate"
                labelProps={{
                  style: { paddingBottom: "12px", color: theme.colors?.slate?.[7], fontSize: "16px", fontWeight: 500, lineHeight: "150%" },
                }}
              />
            </Flex>

            <Fieldset
              legend="Mortgage Type"
              w="100%"
              style={{
                color: theme.colors?.slate?.[7],
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "150%",
                border: "none",
                paddingLeft: 0,
                paddingRight: 0,
                paddingBottom: "12px",
                marginTop: "24px",
              }}
            >
              <Flex gap={12} direction="column">
                <Radio
                  style={{
                    border: `1px solid ${theme.colors?.slate?.[5]}`,
                    borderRadius: "4px",
                    padding: "12.5px 16px",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "125%",
                  }}
                  c={theme.colors?.slate?.[9]}
                  value="repayment"
                  label="Repayment"
                  checked={mortgageType === "repayment"}
                  onChange={() => setMortgageType("repayment")}
                />
                <Radio
                  style={{
                    border: `1px solid ${theme.colors?.slate?.[5]}`,
                    borderRadius: "4px",
                    padding: "12.5px 16px",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "125%",
                  }}
                  c={theme.colors?.slate?.[9]}
                  value="interest-only"
                  label="Interest Only"
                  checked={mortgageType === "interest-only"}
                  onChange={() => setMortgageType("interest-only")}
                />
              </Flex>
            </Fieldset>

            <Button
              mt={30}
              size={"lg"}
              justify={"left"}
              leftSection={calculatorIcon}
              rightSection={<span />}
              c={theme.colors?.slate?.[9]}
              radius={"xl"}
              style={{ fontSize: "18px", fontWeight: 700, lineHeight: "125%" }}
              type="submit"
            >
              Calculate Repayments
            </Button>
          </form>
        </Box>
        <Box w={540} h={606} style={{ backgroundColor: theme.colors?.slate?.[9] }}>
          <Flex h="100%" justify="center" align="center" direction="column" gap="sm" p={40}>
            <Image h={192} w={192} src={illustrion} alt={"Illustration"} />
            <Text size="lg" c="white" fw="700">
              Results shown here
            </Text>
            <Text ta="center" size="md" c={theme.colors?.slate?.[5]}>
              Complete the form and click “calculate repayments” to see what your monthly repayments would be.
            </Text>
          </Flex>
        </Box>
      </Flex>
    </MantineProvider>
  );
}

export default App;
